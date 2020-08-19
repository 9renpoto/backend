import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as fs from 'fs'
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked'
import { AppModule } from './app.module'

const { version, name, description } = require('../package.json')

async function bootstrap() {
  initializeTransactionalContext()
  patchTypeORMRepositoryWithBaseRepository()

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build()

  const document = SwaggerModule.createDocument(app, options)

  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document))
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
