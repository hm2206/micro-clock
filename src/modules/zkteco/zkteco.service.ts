import { Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common';
import { ZktecoConfig, ZktecoAttendent } from './zkteco.config';
import { Collection } from 'collect.js';
import { DateTime } from 'luxon';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ZktecoService {

  private ip: string;

  private currentDate: DateTime = DateTime.now();

  private pathStorage = path.resolve(__dirname, `../../../storage`);

  public setIp(ip: string) {
    this.ip = ip;
  }

  public async syncUp(): Promise<boolean> {
    const connection = new ZktecoConfig(this.ip);
    const isGenerate = await connection.generateAttendents();
    if (!isGenerate) throw new InternalServerErrorException("No se pudó sincronizar los datos");
    const datos = connection.getAttendents();
    const collection = new Collection(datos);
    const dataForYears = collection.groupBy('year').all();
    await this.generateDir(dataForYears);
    return isGenerate;
  }

  public async list(year?: number | undefined, month?: number | undefined) {
    try {
      const currentMonth = month || this.currentDate.month;
      const currentYear = year || this.currentDate.year;
      const pathMonth = path.resolve(this.pathStorage, `${this.ip}/${currentYear}/${currentMonth}.json`);
      const exists = fs.existsSync(pathMonth);
      if (!exists) throw new Error();
      const datos = JSON.parse(fs.readFileSync(pathMonth, 'utf-8'));
      return {
        year,
        month: currentMonth,
        data: datos
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  private async generateDir(dataForYears: any) {
    const foreachYear = Object.keys(dataForYears);
    for(let keyYear of foreachYear) {
      let dataForMonth = new Collection(dataForYears[keyYear]).groupBy('month').all();
      const foreachMonth = Object.keys(dataForMonth);
      for(let keyMonth of foreachMonth) {
        let payload = dataForMonth[keyMonth];
        await this.preparateData(keyYear, keyMonth, payload);
      }
    }
  }

  private async preparateData(year: string, month: string, payload: ZktecoAttendent[]) {
    const fileStorage = `${month}.json`;
    const pathYear = path.resolve(this.pathStorage, this.ip, year);
    const pathMonth = path.resolve(pathYear, fileStorage);
    const existsMonth = fs.existsSync(pathMonth);
    if (!existsMonth) return this.saveData(pathYear, pathMonth, payload);
    if (this.currentDate.year ===  parseInt(year) && 
    (this.currentDate.month) === parseInt(month)) {
      return this.addSaveData(pathYear, pathMonth, payload);
    }
  }

  private async saveData(pathYear: string, pathMonth: string, payload: ZktecoAttendent[]) {
    const dataUnique = await this.updateMonthUnique(payload);
    fs.mkdirSync(`${pathYear}`, { recursive: true })
    fs.writeFileSync(pathMonth, JSON.stringify(dataUnique));
  }

  private async addSaveData(pathYear: string, pathMonth: string, payload: ZktecoAttendent[]) {
    const dataExists = JSON.parse(fs.readFileSync(pathMonth, 'utf-8'));
    let combineData = [];
    const countDataExists = dataExists.length || 0;
    if (countDataExists == payload.length) return;
    else if (countDataExists > payload.length) {
      combineData = [...dataExists, ...payload] as ZktecoAttendent[];
    } else if(countDataExists < payload.length) {
      combineData = payload;
    } else {
      return;
    }
    // guardar datos
    await this.saveData(pathYear, pathMonth, combineData);
  }

  private async updateMonthUnique(payload: ZktecoAttendent[]): Promise<ZktecoAttendent[]> {
    const dataUnique  = new Collection([]);
    await payload.map(async data => {
      // Obtener registro existente;
      const exists = await dataUnique.where('numberCredential', data.numberCredential)
        .where('day', data.day)
        .where('hour', data.hour)
        .where('minute', data.minute)
        .first() ? true : false;
      // validar si el registro no existe en el JSON
      if (!exists) dataUnique.push(data);
      // response
      return data;
    });
    // response data formateada
    return await dataUnique.toArray();
  }

}