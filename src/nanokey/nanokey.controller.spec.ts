import { Test, TestingModule } from '@nestjs/testing';
import { NanokeyController } from './nanokey.controller';

describe('Nanokey Controller', () => {
  let controller: NanokeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NanokeyController],
    }).compile();

    controller = module.get<NanokeyController>(NanokeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
