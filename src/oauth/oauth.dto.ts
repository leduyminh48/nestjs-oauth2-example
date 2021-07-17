import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthorizeDto {
  @IsNotEmpty()
  client_id: string;

  @IsNotEmpty()
  redirect_uri: string;

  @IsNotEmpty()
  grant_type: string;

  @IsNotEmpty()
  response_type: string;

  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  userPassword: string;
}

export class GetAccessTokenDto {
  @IsNotEmpty()
  grant_type: string;
}
