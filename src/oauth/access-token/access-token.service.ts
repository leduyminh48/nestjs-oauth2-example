import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessTokenOauth } from './access-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccessTokenService {
  constructor(
    @InjectRepository(AccessTokenOauth)
    private readonly _repo: Repository<AccessTokenOauth>,
  ) {}

  save(dto: Partial<AccessTokenOauth>) {
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
