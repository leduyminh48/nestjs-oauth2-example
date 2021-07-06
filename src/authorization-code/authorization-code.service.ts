import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorizationCode } from './authorization-code.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorizationCodeService {
  constructor(
    @InjectRepository(AuthorizationCode)
    private readonly _repo: Repository<AuthorizationCode>,
  ) {
  }

  save(dto: Partial<AuthorizationCode>) {
    return this._repo.save(dto);
  }

  findOne(authorizationCode) {
    return this._repo.findOneOrFail({
      authorizationCode,
    }, {
      relations: ['client', 'user'],
    });
  }

  revoke(authorizationCode) {
    return this._repo.softDelete({
      authorizationCode,
    });
  }
}
