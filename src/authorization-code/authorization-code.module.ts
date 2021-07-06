import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationCode } from './authorization-code.entity';
import { AuthorizationCodeService } from './authorization-code.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorizationCode])],
  providers: [AuthorizationCodeService],
  exports: [AuthorizationCodeService],
})
export class AuthorizationCodeModule {}
