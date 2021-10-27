import { DateTime } from 'luxon';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ConfigClockEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public slug: string;

  @Column()
  public userSn: number;

  @Column()
  public deviceUserId: string;

  @Column()
  public recordTime: string;

  @Column({ name: 'clock_id' })
  public clockId: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: DateTime;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: DateTime;

}