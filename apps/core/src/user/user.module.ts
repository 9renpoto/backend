import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserDataLoader } from './user.loader'
import { UserResolver } from './user.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserDataLoader, UserResolver]
})
export class UserModule {}
