import { Injectable } from '@nestjs/common';
import levelup from 'levelup';
import leveldown from 'leveldown';

import { DatabaseReadError } from './nanokey.interface';

@Injectable()
export class NanokeyService {
  private readonly db = levelup(leveldown(
      process.env.NONOKEY_DB_NAME
        ? process.env.NONOKEY_DB_NAME
        : 'smol'));

  async findByKey(
    key: string,
    fuzzy: boolean = false,
    limit: number = -1,
  ): Promise<string | string[] | DatabaseReadError> {
    if (!fuzzy) {
      try {
        return this.db.get(key).toString();
      } catch (e) {
        return new DatabaseReadError('Failed to find key');
      }
    }

    // Create a range query stream to get all matches
    const readStream = this.db.createReadStream({
      gte: key,
      lte: String.fromCharCode(key.charCodeAt(0) + 1),
    });

    const values = [];
    readStream.on('data', (data) => values.push(data));

    return values;
  }

  async createEntry(
    key: string,
    value: string,
    safe: boolean = false,
  ): Promise<boolean> {
    if (safe) {
      const val = await this.db.get(key);
      if (val) {
        return false;
      }
    }

    try {
      const out = await this.db.put(key, value);
      return true;
    } catch {
      return false;
    }
  }
}
