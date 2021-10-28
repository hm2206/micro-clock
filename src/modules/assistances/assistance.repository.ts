import { Repository, EntityRepository } from 'typeorm';
import { AssistanceEntity } from './assistance.entity';

@EntityRepository(AssistanceEntity)
export class AssistanceRepository extends Repository<AssistanceEntity> {

  public async UpdateAssistanceStatusProcedure(scheduleId: number) {
    return await this.query(`call UpdateAssistanceStatusProcedure(?)`, [scheduleId]);
  }

}