import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum, IsNotEmpty, IsUrl, IsUUID, MinLength } from 'class-validator';

export enum Grant {
  ClientCredentials = 'client_credentials',
  AuthorizationCodes = 'authorization_code',
  RefreshToken = 'refresh_token',
  Password = 'password',
}

@Entity()
export class ClientOauth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  clientId: string;

  @Column({ type: 'text', select: false })
  clientSecret: string;

  @Column('simple-array')
  redirectUris: string[];

  @Column('simple-array')
  grants: Grant[];
}

export class ClientDto {
  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @IsNotEmpty()
  @MinLength(8)
  clientSecret: string;

  @IsUrl({ protocols: ['https'] }, { each: true })
  @IsNotEmpty()
  redirectUris: string[];

  @IsNotEmpty()
  @IsEnum(Grant, { each: true })
  grants: Grant[];
}
