import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Client } from '../client/client.entity';

@Entity()
export class AuthorizationCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  authorizationCode: string;

  @ManyToOne(() => Client)
  client: Client;

  @ManyToOne(() => User)
  user: User;

  @Column('timestamp')
  expiresAt: Date;

  @Column('text')
  redirectUri: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
