import { resolve } from 'path'
import { Module, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StripeModule } from 'nestjs-stripe'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { RavenModule, RavenInterceptor } from 'nest-raven'
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core/constants'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HealthModule } from './health/health.module'
import databaseConfig from './config/database'
import stripeConfig from './config/stripe'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(process.cwd(), '../../.env'),
      load: [databaseConfig, stripeConfig]
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile:
        process.env.NODE_ENV === 'production' ? true : `./src/schema.gql`,
      context: ({ req }) => ({ req })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get('database')
    }),
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('stripe')
    }),
    HealthModule,
    RavenModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor()
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
