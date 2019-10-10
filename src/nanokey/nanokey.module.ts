import { Module } from '@nestjs/common';
import { NanokeyService } from './nanokey.service';

@Module({
  providers: [NanokeyService],
})
export class NanokeyModule {}
