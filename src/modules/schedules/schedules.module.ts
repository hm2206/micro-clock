import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleRepository } from './schedule.repository';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleRepository])],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
