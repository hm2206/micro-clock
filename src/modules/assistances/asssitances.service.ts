import { Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import { ZktecoAttendent } from "../zkteco/zkteco.config";
import { ClockEntity } from "../clocks/clock.entity";

@Injectable()
export class AssistancesService {

  private storagePath = path.resolve(__dirname, '../../../storage');

  public async migration(clock: ClockEntity, year: number, month: number) {
    const pathMonth = path.resolve(this.storagePath, `${clock.host}/${year}/${month}.js`);
    const exists = fs.existsSync(pathMonth);
    if (!exists) return;
    const dataStorage = JSON.parse(fs.readFileSync(pathMonth, 'utf8')) as ZktecoAttendent[];
    for (let data of dataStorage) {
      
    }
  }

}