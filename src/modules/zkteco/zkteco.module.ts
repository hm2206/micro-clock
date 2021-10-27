import { Module } from '@nestjs/common';
import { ZktecoService } from './zkteco.service';
import { ZktecoController } from './zkteco.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ZktecoTask } from './zkteco.task';
import { ClocksModule } from '../clocks/clocks.module';
import { AssistancesModule } from '../assistances/assistances.module';
import { SchedulesModule } from '../schedules/schedules.module';

@Module({
  imports: [
    AssistancesModule,
    SchedulesModule,
    ClocksModule,
    ClientsModule.register([
      { 
        name: 'CLOCK_SERVICE', 
        transport: Transport.TCP ,
        options: {
          port: 5000
        }
      }
    ])
  ],
  providers: [ZktecoService, ZktecoTask],
  exports: [ZktecoService],
  controllers: [ZktecoController],
})
export class ZktecoModule {}
