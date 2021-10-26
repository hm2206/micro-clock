import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ClocksService } from '../clocks/clocks.service';
import { ZktecoService } from './zkteco.service';

@Injectable()
export class ZktecoTask {
  constructor(
    private readonly clocksService: ClocksService,
    private readonly zktecoService: ZktecoService,
  ) {}

  private readonly logger = new Logger(ZktecoTask.name);

  @Cron('0 */20 9-20 * * *')
  public async handleCron() {
    const clocks = await this.clocksService.all();
    for (let clock of clocks) {
      console.log(clock.host);
      this.zktecoService.setIp(clock.host);
      const success = await this.zktecoService.syncUp();
      console.log(`syncUp ${clock.host} => ${success}`);
    }
  }
}