import { Test, TestingModule } from '@nestjs/testing';

import { NanokeyService } from './nanokey.service';
import {
  DatabaseReadError,
  KV,
  DatabaseWriteError,
  DatabaseDeleteError,
} from './nanokey.interface';

describe('NanokeyService', () => {
  let service: NanokeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NanokeyService],
    }).compile();
    await module.init();

    service = module.get<NanokeyService>(NanokeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
