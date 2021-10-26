import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DateTime } from 'luxon';

@Entity('clocks')
export class ClockEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'entity_id' })
  public entityId: number;

  @Column()
  public name: string;

  @Column()
  public host: string;

  @Column()
  public port: number;

  @Column({ default: false }) 
  public sync: boolean;

  @Column({ default: true })
  public state: boolean;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: DateTime;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: DateTime;

}