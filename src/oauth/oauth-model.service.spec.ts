import { Test, TestingModule } from '@nestjs/testing';
import { OauthModelService } from './oauth-model.service';

describe('OauthModelService', () => {
  let service: OauthModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OauthModelService],
    }).compile();

    service = module.get<OauthModelService>(OauthModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
