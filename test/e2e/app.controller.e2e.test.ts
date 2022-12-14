import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@infrastructure/module/app.module';
import { DomainErrorsInterceptor } from '@infrastructure/error/interceptors/domain-errors.interceptor';

describe('AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new DomainErrorsInterceptor());

    app.useLogger(false);
    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /eligibility', () => {
    it('should return 200 when approve client', async () => {
      const body = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [
          3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941,
          4597,
        ],
      };
      await request(app.getHttpServer())
        .post('/eligibility')
        .send(body)
        .expect(200)
        .expect({
          elegivel: true,
          economiaAnualDeCO2: 5553.24,
        });
    });

    it('should return 200 when disapproved for consumption annual ', async () => {
      const body = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [],
      };
      await request(app.getHttpServer())
        .post('/eligibility')
        .send(body)
        .expect(200)
        .expect({
          elegivel: false,
          razoesInelegibilidade:
            'Consumo anual para tipo de conexão não aceita',
        });
    });

    it('should return 200 when disapproved for consumption class and modality tariff client', async () => {
      const body = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'rural',
        modalidadeTarifaria: 'verde',
        historicoDeConsumo: [
          3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
        ],
      };

      await request(app.getHttpServer())
        .post('/eligibility')
        .send(body)
        .expect(200)
        .expect({
          elegivel: false,
          razoesInelegibilidade:
            'Classe de consumo não aceita,Modalidade tarifária não aceita',
        });
    });

    it('should return 200 when disapproved for consumption annual and consumption class and modality tariff client ', async () => {
      const body = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'rural',
        modalidadeTarifaria: 'verde',
        historicoDeConsumo: [60, 70, 20, 50, 10, 400, 300, 100],
      };

      await request(app.getHttpServer())
        .post('/eligibility')
        .send(body)
        .expect(200)
        .expect({
          elegivel: false,
          razoesInelegibilidade:
            'Classe de consumo não aceita,Modalidade tarifária não aceita,Consumo anual para tipo de conexão não aceita',
        });
    });

    it('should return 400 when invalid property in body', async () => {
      const body = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [
          3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941,
          4597, 2342, 1233, 3213,
        ],
      };
      await request(app.getHttpServer())
        .post('/eligibility')
        .send(body)
        .expect(400)
        .expect({
          statusCode: 400,
          message: ['historicoDeConsumo must contain no more than 12 elements'],
          error: 'Bad Request',
        });
    });

    it('should return 400 when invalid class conumption', async () => {
      const body = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'test',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [
          3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941,
          4597,
        ],
      };
      await request(app.getHttpServer())
        .post('/eligibility')
        .send(body)
        .expect(400)
        .expect({
          statusCode: 400,
          message:
            'Invalid consumption class. must be (comercial,industrial,poderPublico,residencial,rural)',
          error: 'Bad Request',
        });
    });

    it('should return 400 when invalid modality tariff', async () => {
      const body = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'rural',
        modalidadeTarifaria: 'test',
        historicoDeConsumo: [
          3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941,
          4597,
        ],
      };
      await request(app.getHttpServer())
        .post('/eligibility')
        .send(body)
        .expect(400)
        .expect({
          statusCode: 400,
          message:
            'Invalid tariff modality. must be (azul,convencional,verde,branco)',
          error: 'Bad Request',
        });
    });

    it('should return 400 when invalid modality tariff', async () => {
      const body = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'test',
        classeDeConsumo: 'rural',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [
          3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941,
          4597,
        ],
      };
      await request(app.getHttpServer())
        .post('/eligibility')
        .send(body)
        .expect(400)
        .expect({
          statusCode: 400,
          message:
            'Invalid connection type modality. must be (monofasica,bifasico,trifasica)',
          error: 'Bad Request',
        });
    });
  });
});
