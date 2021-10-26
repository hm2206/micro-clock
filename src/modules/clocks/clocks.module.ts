import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClockRepository } from './clock.repository';
import { ClocksController } from './clocks.controller';
import { ClocksService } from './clocks.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClockRepository])],
  controllers: [ClocksController],
  providers: [ClocksService],
  exports: [ClocksService],
})
export class ClocksModule {}
