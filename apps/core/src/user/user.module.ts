import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { DataLoaderInterceptor } from 'nestjs-dataloader'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserDataLoader } from './user.loader'
import { UserResolver } from './user.resolver'

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
