import { Loader } from 'nestjs-dataloader'
import { Resolver, Query, Args } from '@nestjs/graphql'
import { InputType, Field } from 'type-graphql'
import { UserDataLoader, UserLoader } from './user.loader'
import { User } from './user.entity'
import { UserService } from './user.service'

@InputType()
class UserInput implements Partial<User> {
  @Field()
  id: string
}

@Resolver('User')
export class UserResolver {
  @Query(() => User)
  async user(
    @Args('id') { id }: UserInput,
    @Loader(UserDataLoader.name) loader: UserLoader
  ): Promise<User> {
    return loader.load(id)
  }
}
