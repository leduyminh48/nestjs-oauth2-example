import { Test, TestingModule } from '@nestjs/testing';
import { InteractionsController } from './interactions.controller';

describe('InteractionsController', () => {
  let controller: InteractionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteractionsController],
    }).compile();

    controller = module.get<InteractionsController>(InteractionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
