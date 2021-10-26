import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

export const databaseService = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'mysql',
      host: config.get('MYSQL_HOST', 'localhost'),
      port: config.get('MYSQL_PORT', 3306),
      username: config.get('MYSQL_USER', 'root'),
      password: config.get('MYSQL_PASSWORD', ''),
      database: config.get('MYSQL_DBNAME', 'root'),
      entities: [path.resolve(__dirname, '../modules/**/*.entity{.ts,.js}')],
    })
  })
];