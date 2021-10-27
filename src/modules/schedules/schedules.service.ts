import { Injectable } from "@nestjs/common";
import { ScheduleEntity } from "./schedule.entity";
import { ScheduleRepository } from "./schedule.repository";

@Injectable()
export class SchedulesService {
  constructor(private readonly scheduleRespository: ScheduleRepository) {}

  public async find(id: number): Promise<ScheduleEntity> {
    return await this.scheduleRespository.findOneOrFail(id);
  } 

  public async findYearAndMonth(year: number, month: number): Promise<ScheduleEntity[]> {
    return await this.scheduleRespository.findYearAndMonth(year, month);
  }

}