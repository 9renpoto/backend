import { ObjectType, ID, Field } from "type-graphql";
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { EntityRepository } from "typeorm";

@ObjectType()
export class User {
  @Field(() => ID)
  readonly id: string
}

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
