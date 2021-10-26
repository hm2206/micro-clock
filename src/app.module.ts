import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ZktecoModule } from './modules/zkteco/zkteco.module';
import { DatabaseModule } from './database/database.module';
import { ClocksModule } from './modules/clocks/clocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({  
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    ZktecoModule,
    DatabaseModule,
    ClocksModule,
  ],
})
export class AppModule {
  static host: string;
  static port: number;
  constructor(private readonly config: ConfigService) {
    AppModule.host = this.config.get<string>('HOST', 'localhost');
    AppModule.port = parseInt(this.config.get<string>('PORT')) || 3000;
  }
}
