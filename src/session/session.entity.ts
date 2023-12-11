import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SessionEntity {
  @PrimaryGeneratedColumn()
  sessionId: number;

  @Column()
  referenceId: number;

  @Column()
  createdAt: string;
}
