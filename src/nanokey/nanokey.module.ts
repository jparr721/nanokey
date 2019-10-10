import { Module } from '@nestjs/common';
import { NanokeyService } from './nanokey.service';
import { NanokeyController } from './nanokey.controller';

@Module({
  providers: [NanokeyService],
  controllers: [NanokeyController],
})
export class NanokeyModule {}
