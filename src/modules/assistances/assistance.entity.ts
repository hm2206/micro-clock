import { DateTime } from 'luxon';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

enum statusAssistance {
  ENTRY = "ENTRY",
  EXIT = "EXIT",
}

@Entity('assistances')
export class AssistanceEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'schedule_id' })
  public scheduleId: number; 

  @Column({ name: 'clock_id', nullable: true })
  public clockId: number;

  @Column({ name: 'record_time', type: 'time' })
  public recordTime: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public delay: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) 
  public extra: number;

  @Column({ type: 'enum', enum: statusAssistance, default: 'ENTRY' })
  public status: string;

  @Column({ nullable: true })
  public description: string;

  @Column({ type: 'boolean', default: true })
  public state: boolean

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

}