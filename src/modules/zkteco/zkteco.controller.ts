import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AssistancesService } from '../assistances/asssitances.service';
import { ClocksService } from '../clocks/clocks.service';
import { ZktecoService } from './zkteco.service';

@Controller('zkteco')
export class ZktecoController {
  @Inject('CLOCK_SERVICE')
  private readonly client: ClientProxy;

  constructor(
    private readonly zktecoService: ZktecoService,
    private readonly clocksService: ClocksService,
    private readonly assistancesService: AssistancesService
  ) {}

  @Get(':ip/syncUp')
  public async syncUp(@Param('ip') ip: string) {
    const clock = await this.clocksService.find({ host: ip });
    this.zktecoService.setIp(clock.host);
    await this.zktecoService.syncUp();
    await this.assistancesService.migration(clock, 2021, 10);
  }

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
