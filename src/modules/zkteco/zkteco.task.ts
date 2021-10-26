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

  @Cron('0 */1 9-17 * * *')
  public async handleCron() {
    const clocks = await this.clocksService.all();
    for (let clock of clocks) {
      this.zktecoService.setIp(clock.host);
      console.log(clock.host);
      await this.zktecoService.syncUp();
      console.log(`syncUp`);
    }
  }
}