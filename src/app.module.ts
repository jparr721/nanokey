import { Module } from '@nestjs/common';
import { NanokeyModule } from './nanokey/nanokey.module';

@Module({
  imports: [NanokeyModule],
})
export class AppModule {}
