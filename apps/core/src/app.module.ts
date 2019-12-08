import { resolve } from 'path'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StripeModule } from 'nestjs-stripe'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { GraphQLModule } from '@nestjs/graphql'
import { RavenModule } from 'nest-raven'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      path: resolve(process.cwd(), '../../.env')
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: `./src/schema.gql`,
      context: ({ req }) => ({ req })
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database')
    }),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('stripe')
    }),
    HealthModule,
    RavenModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
