import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoRepository } from './info.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InfoRepository])],
})
export class InfosModule {}
