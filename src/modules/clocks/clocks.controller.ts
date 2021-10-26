import { Controller, Get } from '@nestjs/common';
import { ClocksService } from './clocks.service';

@Controller('clocks')
export class ClocksController {
  constructor(private readonly clocksService: ClocksService) {}

  @Get()
  public index() {
    return this.clocksService.all();
  }

}