import { Injectable } from "@nestjs/common";
import { ClockRepository } from "./clock.repository";

@Injectable()
export class ClocksService  {
  constructor(private readonly clockRepository: ClockRepository) {}

  public all() {
    return this.clockRepository.find();
  }

}