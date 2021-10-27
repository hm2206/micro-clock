import { Repository, EntityRepository } from 'typeorm';
import { AssistanceEntity } from './assistance.entity';

@EntityRepository(AssistanceEntity)
export class AssistanceRepository extends Repository<AssistanceEntity> {}