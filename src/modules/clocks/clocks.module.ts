import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClockRepository } from './clock.repository';
import { ClocksController } from './clocks.controller';
import { ClocksService } from './clocks.service';
import { ConfigClockEntity } from './config-clock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClockRepository, ConfigClockEntity])],
  controllers: [ClocksController],
  providers: [ClocksService],
  exports: [ClocksService],
})
export class ClocksModule {}
