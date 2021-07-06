import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Client } from '../client/client.entity';

@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  accessToken: string;

  @ManyToOne(() => Client)
  client: Client;

  @ManyToOne(() => User)
  user: User;

  @Column('timestamp')
  expiresAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
