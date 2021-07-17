import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenOauth } from './access-token.entity';
import { AccessTokenService } from './access-token.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccessTokenOauth])],
  providers: [AccessTokenService],
  exports: [AccessTokenService],
})
export class AccessTokenModule {}
