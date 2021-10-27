import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { AssistancesService } from '../assistances/asssitances.service';
import { ClocksService } from '../clocks/clocks.service';
import { ZktecoService } from './zkteco.service';

@Injectable()
export class ZktecoTask {
  constructor(
    private readonly clocksService: ClocksService,
    private readonly zktecoService: ZktecoService,
    private readonly assistancesService: AssistancesService,
  ) {}

  private readonly logger = new Logger(ZktecoTask.name);

  @Cron('0 */2 7-12 * * *')
  public async handleCron() {
    // const currentDate = DateTime.now();
    // const clocks = await this.clocksService.all();
    // // migrate data to clock
    // for (let clock of clocks) {
    //   await this.clocksService.toggleSync(clock.id, true);
    //   this.zktecoService.setIp(clock.host);
    //   await this.zktecoService.syncUp();
    //   await this.assistancesService.migration(clock, currentDate.year, currentDate.month);
    //   await this.clocksService.toggleSync(clock.id, false);
    // }
  }
}