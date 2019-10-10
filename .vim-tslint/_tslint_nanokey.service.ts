import { Injectable } from '@nestjs/common';
import level from 'level';

import { DatabaseReadError } from './nanokey.interface';

@Injectable()
export class NanokeyService {
  constructor() {
    const db = level(
      process.env.NONOKEY_DB_NAME ? process.env.NONOKEY_DB_NAME : 'smol');
  }

  async findByKey(key: string, fuzzy: boolean = false): Promise<any, DatabaseReadError> {

  }
}
