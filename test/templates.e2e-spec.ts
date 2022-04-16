import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { MockAuthGuard } from 'src/auth/mockAuthGuard';
import { TemplatesController } from 'src/templates/templates.controller';
import { TemplatesService } from 'src/templates/templates.service';

describe('ContainerTypes (e2e)', () => {
  let app: INestApplication;
  let templatesController: TemplatesController;
  let templatesService: TemplatesService;
  let responseCreate;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    templatesService = moduleFixture.get<TemplatesService>(TemplatesService);
    templatesController =
      moduleFixture.get<TemplatesController>(TemplatesController);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Index Container Types', async () => {
    const dataTest = JSON.stringify(await templatesService.getAll());
    return request(app.getHttpServer())
      .get('/templates')
      .expect(200)
      .expect(dataTest);
  });

  it('/Create Container Type', async () => {
    const dataTest = {
      name: 'testCreate',
      date: '2020-02-02',
      operation: '1',
    };
    responseCreate = await request(app.getHttpServer())
      .post('/templates?operation=1')
      .send(dataTest)
      .expect(200);
  });

  it('/Update Container Type', async () => {
    const dataTest = {
      name: 'testCreateUpdate',
      date: '2020-02-02',
      operation: '1',
    };

    return request(app.getHttpServer())
      .put('/templates/' + responseCreate.body.result.id)
      .send(dataTest)
      .expect(200);
  });

  it('/Delete Container Type', async () => {
    return request(app.getHttpServer())
      .delete('/templates/' + responseCreate.body.result.id)
      .expect(200);
  });
});
