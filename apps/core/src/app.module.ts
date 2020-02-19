import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core/constants'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { Module, ValidationPipe } from '@nestjs/common'
import { RavenModule, RavenInterceptor } from 'nest-raven'
import { StripeModule } from 'nestjs-stripe'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HealthModule } from './health/health.module'
import { UserModule } from './user/user.module';
import databaseConfig from './config/database'
import stripeConfig from './config/stripe'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [databaseConfig, stripeConfig]
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile:
        process.env.NODE_ENV === 'production' ? true : `./src/schema.gql`,
      context: ({ req }) => ({ req })
    }),
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('stripe')
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const c = config.get('database')
        console.warn(c)
        return c
      }
    }),
    HealthModule,
    RavenModule,
    UserModule
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
