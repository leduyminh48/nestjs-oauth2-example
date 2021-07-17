import { Test, TestingModule } from '@nestjs/testing';
import { OidcProviderService } from './oidc-provider.service';

describe('OidcProviderService', () => {
  let service: OidcProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OidcProviderService],
    }).compile();

    service = module.get<OidcProviderService>(OidcProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
