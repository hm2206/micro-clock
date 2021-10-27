import { Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne } from "typeorm";
import { ScheduleEntity } from "../schedules/schedule.entity";
import { WorkEntity } from "../works/work.entity";

@Entity('infos')
export class InfoEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'work_id' })
  public workId: number;

  @ManyToOne(() => WorkEntity, work => work.infos)
  @JoinColumn({ name: 'work_id' })
  public work: WorkEntity;

  @OneToMany(() => ScheduleEntity, schedule => schedule.info)
  public schedules: ScheduleEntity[];
}