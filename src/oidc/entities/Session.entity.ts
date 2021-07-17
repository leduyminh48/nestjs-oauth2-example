import { Column, Entity } from 'typeorm';
import { BaseOidcEntity } from './BaseOidcEntity';

@Entity()
export class Session extends BaseOidcEntity {
  @Column({ type: 'text' })
  uid: string;
}
