import { ObjectType, ID, Field } from 'type-graphql'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import {
  EntityRepository,
  PrimaryGeneratedColumn,
  Entity,
  Column
} from 'typeorm'

@Entity('users')
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column()
  readonly name: string
}

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
