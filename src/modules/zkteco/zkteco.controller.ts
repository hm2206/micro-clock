import { Controller, Get, Param, Query } from '@nestjs/common';
import { ZktecoService } from './zkteco.service';

@Controller('zkteco')
export class ZktecoController {
  constructor(
    private readonly zktecoService: ZktecoService,
  ) {}

  @Get(':ip/history')
  public async history(@Param('ip') ip: string, @Query() query) {
    this.zktecoService.setIp(ip);
    return this.zktecoService.list(query.year, query.month);
  }

  @Get(':ip/backup')
  public async backup(@Param('ip') ip: string) {
    this.zktecoService.setIp(ip);
    return this.zktecoService.syncUp();
  }
}
