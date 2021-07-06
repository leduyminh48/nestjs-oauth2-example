import { Injectable } from '@nestjs/common';
import { OauthModelService } from './oauth-model.service';

import * as OAuth2Server from 'oauth2-server';

@Injectable()
export class OauthServerService {
  private readonly _server: OAuth2Server;

  get server(): OAuth2Server {
    return this._server;
  }

  constructor(private model: OauthModelService) {
    this._server = new OAuth2Server({
      model: model,
      accessTokenLifetime: 60 * 60 * 24, // 24 hours, or 1 day
      allowEmptyState: true,
      allowExtendedTokenAttributes: true,
    });
  }
}
