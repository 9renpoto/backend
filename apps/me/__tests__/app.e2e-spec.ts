import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { randomPort } from '../test.util'
import { AppModule } from './../src/app.module'

describe.skip('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    const port = await randomPort()
    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    )
    await app.listen(port)
  })

  afterEach(() => app.close())

  it('/ (GET)', () =>
    request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!'))
})
