import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from './access-token.entity';
import { AccessTokenService } from './access-token.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccessToken])],
  providers: [AccessTokenService],
  exports: [AccessTokenService]
})
export class AccessTokenModule {
}
