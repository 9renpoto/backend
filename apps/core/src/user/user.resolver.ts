import { Loader } from 'nestjs-dataloader'
import { Resolver, Query } from '@nestjs/graphql'
import { UserDataLoader, UserLoader } from './user.loader'
import { User } from './user.entity'

@Resolver()
export class UserResolver {
  @Query(() => User)
  public user(@Loader(UserDataLoader.name) loader: UserLoader): Promise<User> {
    return loader.load('id')
  }
}
