import { Module } from '@nestjs/common';
import { databaseService } from './database.service';

@Module({
  imports: [...databaseService],
  exports: [...databaseService],
})
export class DatabaseModule {}
