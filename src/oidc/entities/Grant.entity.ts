import { Entity } from 'typeorm';
import { BaseOidcEntity } from './BaseOidcEntity';

@Entity()
export class Grant extends BaseOidcEntity {}
