import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssistanceRepository } from './assistance.repository';
import { AssistancesService } from './asssitances.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssistanceRepository])],
  providers: [AssistancesService],
  exports: [AssistancesService],
})
export class AssistancesModule {}
