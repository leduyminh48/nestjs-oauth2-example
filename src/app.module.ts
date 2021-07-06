import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { AccessTokenModule } from './access-token/access-token.module';
import { AuthorizationCodeModule } from './authorization-code/authorization-code.module';
import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      logging: true,
    }),
    UserModule,
    ClientModule,
    AccessTokenModule,
    AuthorizationCodeModule,
    OauthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
