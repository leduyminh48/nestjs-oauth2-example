import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './client.entity';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {
  }

  @Post()
  create(@Body() dto: ClientDto) {
    return this.clientService.save(dto);
  }
}
