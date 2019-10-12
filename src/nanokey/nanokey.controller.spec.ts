import { Test, TestingModule } from '@nestjs/testing';

import { NanokeyController } from './nanokey.controller';
import { NanokeyService } from './nanokey.service';

describe('Nanokey Controller', () => {
  let controller: NanokeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NanokeyController],
      providers: [NanokeyService],
    }).compile();

    controller = module.get<NanokeyController>(NanokeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
