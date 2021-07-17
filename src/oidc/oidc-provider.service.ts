import { Injectable } from '@nestjs/common';
import { Provider } from 'oidc-provider';
import { randomBytes } from 'crypto';
import * as jwks from '../jwks.json';
import { TypeOrmAdapter } from './adapter/typeorm-adapter.service';

@Injectable()
export class OidcProviderService {
  private readonly _oidc: Provider;

  constructor() {
    this._oidc = new Provider(`http://localhost:3000`, {
      cookies: {
        keys: [
          randomBytes(32).toString('base64'),
          randomBytes(32).toString('base64'),
        ],
      },
      jwks,
      adapter: TypeOrmAdapter,
    });
    this._oidc.on('grant.error', console.log);
    this._oidc.on('introspection.error', console.log);
    this._oidc.on('revocation.error', console.log);
  }

  get oidc() {
    return this._oidc;
  }
}
