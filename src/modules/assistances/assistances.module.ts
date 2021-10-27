import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesModule } from '../schedules/schedules.module';
import { AssistanceRepository } from './assistance.repository';
import { AssistancesService } from './asssitances.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssistanceRepository]),
    SchedulesModule,
  ],
  providers: [AssistancesService],
  exports: [AssistancesService],
})
export class AssistancesModule {}
