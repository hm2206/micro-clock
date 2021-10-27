import { EntityRepository, Repository } from "typeorm";
import { ScheduleEntity } from "./schedule.entity";

@EntityRepository(ScheduleEntity)
export class ScheduleRepository extends Repository<ScheduleEntity> {

  public async findYearAndMonth(year: number, month: number) {
    return await this.createQueryBuilder('s')
      .innerJoinAndSelect('s.info', 'i')
      .innerJoinAndSelect('i.work', 'w')
      .where(`YEAR(s.date) = ${year}`)
      .andWhere(`MONTH(s.date) = ${month}`)
      .select('s.id')
      .addSelect('s.index')
      .addSelect('s.date')
      .addSelect('s.timeStart')
      .addSelect('s.delayStart')
      .addSelect('s.timeOver')
      .addSelect('s.modo')
      .addSelect('i.workId')
      .addSelect('w.id')
      .addSelect('w.code')
      .getMany();
  }

}