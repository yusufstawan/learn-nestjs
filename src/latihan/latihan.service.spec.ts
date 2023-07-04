import { Test, TestingModule } from '@nestjs/testing';
import { LatihanService } from './latihan.service';

describe('LatihanService', () => {
  let service: LatihanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LatihanService],
    }).compile();

    service = module.get<LatihanService>(LatihanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
