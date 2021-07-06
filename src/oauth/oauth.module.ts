import { Module } from '@nestjs/common';
import { OauthModelService } from './oauth-model.service';
import { OauthController } from './oauth.controller';
import { OauthServerService } from './oauth-server.service';
import { ClientModule } from '../client/client.module';
import { UserModule } from '../user/user.module';
import { AuthorizationCodeModule } from '../authorization-code/authorization-code.module';
import { AccessTokenModule } from '../access-token/access-token.module';

@Module({
  imports: [
    ClientModule,
    UserModule,
    AuthorizationCodeModule,
    AccessTokenModule,
  ],
  providers: [OauthModelService, OauthServerService],
  controllers: [OauthController],
})
export class OauthModule {}
