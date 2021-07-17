import { Entity } from 'typeorm';
import { BaseOidcEntity } from './BaseOidcEntity';

@Entity()
export class RegistrationAccessToken extends BaseOidcEntity {}
