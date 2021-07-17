import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ClientOauth } from '../client/client.entity';

@Entity()
export class AuthorizationCodeOauth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  authorizationCode: string;

  @ManyToOne(() => ClientOauth)
  client: ClientOauth;

  @ManyToOne(() => User)
  user: User;

  @Column('timestamp')
  expiresAt: Date;

  @Column('text')
  redirectUri: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
