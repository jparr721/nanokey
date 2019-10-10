import { Test, TestingModule } from '@nestjs/testing';
import { NanokeyService } from './nanokey.service';

describe('NanokeyService', () => {
  let service: NanokeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NanokeyService],
    }).compile();

    service = module.get<NanokeyService>(NanokeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
