import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DateTime } from 'luxon';
import { SchedulesService } from '../schedules/schedules.service';
import { ZktecoService } from './zkteco.service';

@Controller('zkteco')
export class ZktecoController {
  @Inject('CLOCK_SERVICE')
  private readonly client: ClientProxy;

  constructor(private readonly zktecoService: ZktecoService, private readonly schedulesService: SchedulesService) {}

  @Get(':ip/history')
  public async history(@Param('ip') ip: string, @Query() query) {
    this.zktecoService.setIp(ip);
    return this.zktecoService.list(query.year, query.month);
  }

  @Get(':ip/testing') 
  public async testing(@Param('ip') ip: string) {
    this.client.emit('syncUp', ip);
  }
}
