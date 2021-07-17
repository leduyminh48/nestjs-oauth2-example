import { Entity } from 'typeorm';
import { BaseOidcEntity } from './BaseOidcEntity';

@Entity()
export class InitialAccessToken extends BaseOidcEntity {}
