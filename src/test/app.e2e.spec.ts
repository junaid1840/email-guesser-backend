import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should return 400 bad request if wrong query string passed / (GET)', async () => {
    return request(app.getHttpServer()).get('/').expect(400);
  });

  it('should return 404 Not found if there is unrecognized domain / (GET)', async () => {
    return request(app.getHttpServer())
      .get('/?firstName=Junaid&lastName=Nazir&domain=abc.com')
      .expect(404);
  });

  it('should return 404 Not found if there is unrecognized domain / (GET)', async () => {
    return request(app.getHttpServer())
      .get('/?firstName=Junaid&lastName=Nazir&domain=google.com')
      .expect(200);
  });
});
