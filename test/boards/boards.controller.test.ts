import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BoardsModule } from '../../src/boards/boards.module';

describe('BoardController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BoardsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/boards (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  });

  it('/boards/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/:id')
      .expect(200)
  });

  it('/boards/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/create')
      .expect(200)
  });

  it('/boards/delete/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/delete/:id')
      .expect(200)
  });

  it('/boards/update/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/update/:id')
      .expect(200)
  });


});
