import { Loader } from 'nestjs-dataloader'
import { Resolver, Query, Parent, Args } from '@nestjs/graphql'
import { UserDataLoader, UserLoader } from './user.loader'
import { User } from './user.entity'

@Resolver('User')
export class UserResolver {
  @Query(() => User)
  async user(
    @Args('id') id: string,
    @Loader(UserDataLoader.name) loader: UserLoader
  ): Promise<User> {
    return loader.load(id)
  }
}
