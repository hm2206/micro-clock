import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ZktecoService } from './zkteco.service';

@Controller('zkteco')
export class ZktecoController {
  @Inject('CLOCK_SERVICE')
  private readonly client: ClientProxy;

  constructor(private readonly zktecoService: ZktecoService) {}

  @Get(':ip/syncUp')
  public async syncUp(@Param('ip') ip: string) {
    this.zktecoService.setIp(ip);
    const process = await this.zktecoService.syncUp();
    return { process };
  }

  @Get(':year/history')
  public async history(@Param('year') year: number, @Query() query) {
    return this.zktecoService.list(year, query.month);
  }

  @Get(':ip/testing') 
  public async testing(@Param('ip') ip: string) {
    this.client.emit('syncUp', ip);
  }
}
