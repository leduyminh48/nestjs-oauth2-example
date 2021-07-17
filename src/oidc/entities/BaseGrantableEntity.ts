import { BaseOidcEntity } from './BaseOidcEntity';
import { Column } from 'typeorm';

export class BaseGrantableEntity extends BaseOidcEntity {
  @Column({ type: 'text', nullable: true })
  grantId?: string;
}
