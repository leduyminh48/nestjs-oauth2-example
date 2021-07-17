import { Entity } from 'typeorm';
import { BaseOidcEntity } from './BaseOidcEntity';

@Entity()
export class Client extends BaseOidcEntity {}
