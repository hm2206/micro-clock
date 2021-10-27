import { DateTime } from 'luxon';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InfoEntity } from '../infos/info.entity';

enum modoSchedule {
  ALL = "ALL",
  ENTRY = "ENTRY",
  EXIT = "EXIT"
}

@Entity('schedules')
export class ScheduleEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'info_id' })
  public infoId: number;

  @Column()
  public index: number;

  @Column({ type: 'date' })
  public date: DateTime;

  @Column({ type: 'time', name: 'time_start' })
  public timeStart: DateTime;

  @Column({ type: 'decimal', name: 'delay_start', precision: 10, scale: 2 })
  public delayStart: number;

  @Column({ type: 'date', name: 'time_over' })
  public timeOver: DateTime;

  @Column({ nullable: true })
  public observation: string 

  @Column({ type: 'enum', enum: modoSchedule, default: 'ALL' })
  public modo: modoSchedule;

  @Column({ type: 'boolean', default: true })
  public state: boolean

  @ManyToOne(() => InfoEntity, info => info.schedules)
  @JoinColumn({ name: 'info_id', referencedColumnName: 'id' })
  public info: InfoEntity;

}