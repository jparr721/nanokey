import { Controller, Param, Get, Query, Res, Body, Post } from '@nestjs/common';
import { Response } from 'express';

import { NanokeyService } from './nanokey.service';

import { DatabaseReadError, KV } from './nanokey.interface';

@Controller('nanokey')
export class NanokeyController {
  constructor(public service: NanokeyService) {}

  @Get(':key')
  async findOne(
    @Res() res: Response,
    @Param('key') key: string,
  ): Promise<Response> {
    const value = await this.service.findByKey(key);
    return !(value instanceof DatabaseReadError)
      ? res.status(200).json({ value })
      : res.status(404).json({ value });
  }

  @Get('/fuzzy/:key')
  async findOneFuzzy(
    @Res() res: Response,
    @Param('key') key: string,
    @Query('limit') limit?: number,
  ): Promise<Response> {
    const value = await this.service.findByKey(key, true, limit);
    return !(value instanceof DatabaseReadError)
      ? res.status(200).json({ value })
      : res.status(404).json({ value });
  }

  @Post()
  async putKeyAndValue(
    @Res() res: Response,
    @Body() kv: KV,
    @Query('safe') safe?: boolean,
  ): Promise<Response> {
    const { key, value } = kv;
    const created = await this.service.createEntry(key, value, safe);

    return created
      ? res.status(201).json({ success: 'created' })
      : res.status(500).json({ failed: 'fialed to insert key' });
  }
}
