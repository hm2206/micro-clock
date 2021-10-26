import { Controller, InternalServerErrorException } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ZktecoService } from './zkteco.service';

@Controller('zkteco')
export class ZktecoMicroservice {

  constructor(private readonly zktecoService: ZktecoService) {}

  @EventPattern('syncUp')
  public async syncUp(ip: Record<string, unknown>) {
    if (!ip) throw new InternalServerErrorException("No se pudo encontrar la dirección IP");
    this.zktecoService.setIp(`${ip}`);
    const process = await this.zktecoService.syncUp();
    console.log('process', process);
  }

}