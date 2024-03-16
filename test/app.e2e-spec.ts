import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CakeModule } from '../src/cake.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CakeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cakes (GET)', () => {
    return request(app.getHttpServer())
      .get('/cakes')
      .expect(200)
      .expect([
        {
            "id": 1,
            "kind": "brownie"
        },
        {
            "id": 2,
            "kind": "chokolate"
        }
    ]);
  });
});
