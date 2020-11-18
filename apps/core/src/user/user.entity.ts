import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  EntityRepository,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@Entity('users')
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column()
  readonly name: string

  @Field()
  @Column({ unique: true })
  readonly email: string
}

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
