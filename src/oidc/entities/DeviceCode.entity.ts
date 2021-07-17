import { Column, Entity } from 'typeorm';
import { BaseGrantableEntity } from './BaseGrantableEntity';

@Entity()
export class DeviceCode extends BaseGrantableEntity {
  @Column({ type: 'text', nullable: true })
  userCode?: string;
}
