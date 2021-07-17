import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationCodeOauth } from './authorization-code.entity';
import { AuthorizationCodeService } from './authorization-code.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorizationCodeOauth])],
  providers: [AuthorizationCodeService],
  exports: [AuthorizationCodeService],
})
export class AuthorizationCodeModule {}
