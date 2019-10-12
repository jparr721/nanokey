import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { NanokeyService } from '../src/nanokey/nanokey.service';
import { NanokeyController } from '../src/nanokey/nanokey.controller';

describe('Nanokey e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        NanokeyService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/nanokey key failure (GET)', async () => {
    const key = 'key';

    await request(app.getHttpServer())
      .get(`/nanokey/${key}`)
      .expect('Content-Type', 'application/json')
      .expect(400);
  });

  it('/nanokey key success (GET)', async () => {
    const key = 'wehave';
    const value = 'bgswag';

    await request(app.getHttpServer())
      .post('/nanokey')
      .send({ key, value })
      .expect(201);

    await request(app.getHttpServer())
      .get(`/nanokey/${key}`)
      .expect('Content-Type', 'application/json')
      .expect(200);
  });

  it('/nanokey delete success (DELETE)', async () => {
    const key = 'wehave';
    const value = 'bigswag';

    await request(app.getHttpServer())
      .post('/nanokey')
      .send({ key, value })
      .expect(201);

    await request(app.getHttpServer())
      .delete(`/nanokey/${key}`)
      .expect('Content-Type', 'application/json')
      .expect(200);
  });
});
