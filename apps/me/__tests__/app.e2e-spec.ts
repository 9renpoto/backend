import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { randomPort } from '../test.util'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    const port = await randomPort()
    app = moduleFixture.createNestApplication(new FastifyAdapter())
    await app.listen(port)
  })

  afterEach(async () => await app.close())

  it('/ (GET)', async () => {
    request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
