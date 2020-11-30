import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  branch: string;
}
