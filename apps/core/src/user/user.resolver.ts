import { Loader } from 'nestjs-dataloader'
import { Resolver, Query, Parent, Args } from '@nestjs/graphql'
import { UserDataLoader, UserLoader } from './user.loader'
import { User } from './user.entity'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  async user(
    @Args('id') id: string,
    @Loader(UserDataLoader.name) loader: UserLoader
  ): Promise<User> {
    console.warn(loader)
    try {
      return await loader.load(id)
    } catch (e) {
      console.warn(e)
      throw e
    }
  }

  @Query(() => User)
  happy(@Parent() user) {
    return user
  }
}
