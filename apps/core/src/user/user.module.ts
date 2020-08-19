import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataLoaderInterceptor } from 'nestjs-dataloader'
import { User } from './user.entity'
import { UserDataLoader } from './user.loader'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    UserDataLoader,
    UserResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class UserModule {}
