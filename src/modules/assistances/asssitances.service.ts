import { Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import { ZktecoAttendent } from "../zkteco/zkteco.config";
import { ClockEntity } from "../clocks/clock.entity";
import { SchedulesService } from "../schedules/schedules.service";
import { Collection } from "collect.js";
import { DateTime } from "luxon";
import { AssistanceRepository } from "./assistance.repository";
import { AssistanceEntity } from "./assistance.entity";

@Injectable()
export class AssistancesService {
  constructor(
    private readonly assistanceRepository: AssistanceRepository,
    private readonly schedulesService: SchedulesService
  ) {}

  private storagePath = path.resolve(__dirname, '../../../storage');

  public async migration(clock: ClockEntity, year: number, month: number) {
    const pathMonth = path.resolve(this.storagePath, `${clock.host}/${year}/${month}.json`);
    const exists = fs.existsSync(pathMonth);
    if (!exists) return;
    const dataStorage = new Collection(JSON.parse(fs.readFileSync(pathMonth, 'utf8')) as ZktecoAttendent[]);
    const schedules = await this.schedulesService.findYearAndMonth(year, month);
    // filtrar y validar assistance
    for (let schedule of schedules) {
      const currentDate = DateTime.fromSQL(`${schedule.date}`);
      const storages = dataStorage
        .where("numberCredential", parseInt(schedule.info?.work?.code || ''))
        .where("day", currentDate.day)
        .toArray() as ZktecoAttendent[];
      // validar y asignar asistencia
      for(let storage of storages) {
        try {
          const assistance = new AssistanceEntity();
          assistance.clockId = clock.id;
          assistance.scheduleId = schedule.id;
          assistance.recordTime = new Date(`${schedule.date} ${storage.hour}:${storage.minute}:00`);
          assistance.delay = 0;
          assistance.extra = 0;
          assistance.status = 'ENTRY';
          await this.assistanceRepository.save(assistance);
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  }

}