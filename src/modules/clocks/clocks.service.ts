import { Injectable } from "@nestjs/common";
import { ClockRepository } from "./clock.repository";

@Injectable()
export class ClocksService  {
  constructor(private readonly clockRepository: ClockRepository) {}

  public all() {
    return this.clockRepository.find();
  }

  public async toggleSync(id: number, statusSync: boolean) {
    const clock = await this.clockRepository.findOneOrFail(id);
    const result = await this.clockRepository.update(clock.id, {
      sync: statusSync
    });
    return result;
  }

}