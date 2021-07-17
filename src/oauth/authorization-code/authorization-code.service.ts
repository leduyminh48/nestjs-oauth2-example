import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorizationCodeOauth } from './authorization-code.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorizationCodeService {
  constructor(
    @InjectRepository(AuthorizationCodeOauth)
    private readonly _repo: Repository<AuthorizationCodeOauth>,
  ) {}

  save(dto: Partial<AuthorizationCodeOauth>) {
    return this._repo.save(dto);
  }

  findOne(authorizationCode) {
    return this._repo.findOneOrFail(
      {
        authorizationCode,
      },
      {
        relations: ['client', 'user'],
      },
    );
  }

  revoke(authorizationCode) {
    return this._repo.softDelete({
      authorizationCode,
    });
  }
}
