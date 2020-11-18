import { Args, ID, Query, Resolver } from '@nestjs/graphql'
import DataLoader from 'dataloader'
import { Loader } from 'nestjs-dataloader'
import { User } from './user.entity'
import { UserDataLoader } from './user.loader'

@Resolver('User')
export class UserResolver {
  @Query(() => User)
  async user(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Loader(UserDataLoader.name) loader: DataLoader<string, User>
  ): Promise<User> {
    return loader.load(id)
  }
}
