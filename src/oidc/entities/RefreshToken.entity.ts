import { Entity } from 'typeorm';
import { BaseGrantableEntity } from './BaseGrantableEntity';

@Entity()
export class RefreshToken extends BaseGrantableEntity {}
