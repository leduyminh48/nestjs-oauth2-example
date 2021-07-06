import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from './access-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccessTokenService {
  constructor(
    @InjectRepository(AccessToken)
    private readonly _repo: Repository<AccessToken>,
  ) {
  }

  save(dto: Partial<AccessToken>) {
    console.log(dto);
    return this._repo.save(dto);
  }

  findOne(accessToken: string) {
    return this._repo.findOneOrFail({
      accessToken,
    });
  }

  revoke(accessToken: string) {
    return this._repo.softDelete({
      accessToken,
    });
  }
}
