import { Test, TestingModule } from '@nestjs/testing';
import { LatihanController } from './latihan.controller';

describe('LatihanController', () => {
  let controller: LatihanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LatihanController],
    }).compile();

    controller = module.get<LatihanController>(LatihanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
