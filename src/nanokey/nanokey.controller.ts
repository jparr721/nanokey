import { Controller, Param, Get } from '@nestjs/common';

import { NanokeyService } from './nanokey.service';

import { DatabaseReadError } from './nanokey.interface';

@Controller('nanokey')
export class NanokeyController {
  constructor(public service: NanokeyService) {}

  @Get(':key')
  async findOne(
    @Param('key') key: string,
  ): Promise<any, DatabaseReadError> {
    const value = await this.service.findByKey;

    return value
  }
}
