import { Loader } from 'nestjs-dataloader'
import DataLoader from 'dataloader'
import { Resolver, Query, Args, InputType, Field } from '@nestjs/graphql'
import { UserDataLoader } from './user.loader'
import { User } from './user.entity'

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
