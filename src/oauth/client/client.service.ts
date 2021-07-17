import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientDto, ClientOauth } from './client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientOauth) private _repo: Repository<ClientOauth>,
  ) {}

  getClient(clientId: string, clientSecret?: string) {
    if (clientSecret == null) {
      return this._repo.findOneOrFail({
        clientId,
      });
    }
    return this._repo.findOneOrFail({
      clientId,
      clientSecret,
    });
  }

  save(dto: ClientDto) {
    return this._repo.save(dto);
  }
}
