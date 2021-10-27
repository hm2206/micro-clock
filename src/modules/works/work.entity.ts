import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InfoEntity } from '../infos/info.entity';

@Entity('works')
export class WorkEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @OneToMany(() => InfoEntity, info => info.work)
  public infos: InfoEntity[];

}