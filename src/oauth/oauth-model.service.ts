import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import {
  AuthorizationCode,
  AuthorizationCodeModel,
  Client as OAuthClient,
  ClientCredentialsModel,
  Token,
  User as OAuthUser,
} from 'oauth2-server';
import { AuthorizationCodeService } from '../authorization-code/authorization-code.service';
import { Client } from '../client/client.entity';
import { User } from '../user/user.entity';
import { AccessTokenService } from '../access-token/access-token.service';
import { AccessToken } from '../access-token/access-token.entity';

@Injectable()
export class OauthModelService
  implements AuthorizationCodeModel, ClientCredentialsModel {
  constructor(
    private clientService: ClientService,
    private authorizationCodeService: AuthorizationCodeService,
    private accessTokenService: AccessTokenService,
  ) {
  }

  getClient(clientId: string, clientSecret: string) {
    return this.clientService.getClient(clientId, clientSecret).catch(() => {
      throw new UnauthorizedException();
    });
  }

  saveToken(token: Token, client, user) {
    /* This is where you insert the token into the database */
    const dto = {
      accessToken: token.accessToken,
      expiresAt: token.accessTokenExpiresAt,
      client: Object.assign(new Client(), { id: client.id }),
      user: Object.assign(new User(), { id: user.id }),
    } as Partial<AccessToken>;
    return this.accessTokenService.save(dto);
  }

  getAccessToken(token) {
    /* This is where you select the token from the database where the code matches */
    return this.accessTokenService.findOne(token);
  }

  getRefreshToken(token) {
    return new Promise((resolve) => resolve(''));
  }

  revokeToken(token: AccessToken) {
    return this.accessTokenService.revoke(token.accessToken).then(res => !!res);
  }

  saveAuthorizationCode(
    code: Pick<AuthorizationCode,
      'authorizationCode' | 'expiresAt' | 'redirectUri' | 'scope'>,
    client: OAuthClient,
    user: OAuthUser,
  ) {
    Logger.log('Call saveAuthorization code ---->');
    console.log(code, client, user);

    return this.authorizationCodeService
      .save({
        authorizationCode: code.authorizationCode,
        expiresAt: code.expiresAt,
        redirectUri: code.redirectUri,
        client: Object.assign(new Client(), { id: client.id }),
        user: Object.assign(new User(), { id: user.id }),
      })
      .then((code) => {
        console.log(code);
        return code;
      });
  }

  getAuthorizationCode(authorizationCode) {
    /* this is where we fetch the stored data from the code */
    return this.authorizationCodeService.findOne(authorizationCode).then(code => {
      delete code.redirectUri;
      return code;
    });
  }

  revokeAuthorizationCode(authorizationCode: AuthorizationCode) {
    return this.authorizationCodeService.revoke(authorizationCode.authorizationCode).then(res => !!res);
  }

  verifyScope(token, scope) {
    return Promise.resolve(true);
  }

  getUserFromClient() {
    return Promise.resolve({});
  }
}
