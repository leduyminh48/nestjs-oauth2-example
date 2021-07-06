import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client, ClientDto } from './client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private _repo: Repository<Client>) {
  }

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
