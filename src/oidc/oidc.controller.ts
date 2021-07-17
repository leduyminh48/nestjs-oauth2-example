import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OidcProviderService } from './oidc-provider.service';

@Controller('oidc')
export class OidcController {
  constructor(private _oidcProvider: OidcProviderService) {}

  @All('/*')
  public mountedOidc(@Req() req: Request, @Res() res: Response): void {
    req.url = req.originalUrl.replace('/oidc', '');
    return this._oidcProvider.oidc.callback()(req, res);
  }
}
