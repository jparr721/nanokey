import { Injectable } from '@nestjs/common';
import levelup from 'levelup';
import leveldown from 'leveldown';

import { DatabaseReadError, DatabaseWriteError, DatabaseDeleteError } from './nanokey.interface';

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
        const result = await this.db.get(key);
        return result.toString();
      } catch (e) {
        return new DatabaseReadError(`Failed: ${e}`);
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
  ): Promise<void | DatabaseWriteError> {
    if (safe) {
      const val = await this.db.get(key);
      if (val) {
        return new DatabaseWriteError('Key already exists');
      }
    }

    try {
      const _ = await this.db.put(key, value);
      return;
    } catch (e) {
        return new DatabaseWriteError(`Failed: ${e}`);
    }
  }

  async deleteEntry(key: string): Promise<void | DatabaseDeleteError> {
    try {
      const _ = await this.db.del(key);
      return;
    } catch (e) {
      return new DatabaseDeleteError('Failed to write key and value');
    }
  }
}
