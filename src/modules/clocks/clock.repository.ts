import { EntityRepository, Repository } from 'typeorm';
import { ClockEntity } from './clock.entity';

@EntityRepository(ClockEntity)
export class ClockRepository extends Repository<ClockEntity> {}