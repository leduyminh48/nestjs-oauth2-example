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
export class AccessTokenOauth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  accessToken: string;

  @ManyToOne(() => ClientOauth)
  client: ClientOauth;

  @ManyToOne(() => User)
  user: User;

  @Column('timestamp')
  expiresAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
