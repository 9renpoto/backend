import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql'
import DataLoader from 'dataloader'
import { Loader } from 'nestjs-dataloader'
import { User } from './user.entity'
import { UserDataLoader } from './user.loader'

@InputType()
class UserInput implements Partial<User> {
  @Field()
  readonly id: string
}

@Resolver('User')
export class UserResolver {
  @Query(() => User)
  async user(
    @Args('id') { id }: UserInput,
    @Loader(UserDataLoader.name) loader: DataLoader<string, User>
  ): Promise<User> {
    return loader.load(id)
  }
}
