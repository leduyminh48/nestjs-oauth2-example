import { Entity } from 'typeorm';
import { BaseOidcEntity } from './BaseOidcEntity';

@Entity()
export class PushedAuthorizationRequest extends BaseOidcEntity {}
