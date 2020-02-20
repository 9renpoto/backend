import { Test, TestingModule } from '@nestjs/testing'
import { createMockRepository } from '../testing/entity'
import { UserResolver } from './user.resolver'
import { UserFactory } from './user.factory'
import { UserDataLoader, UserLoader } from './user.loader'
import { UserService } from './user.service'
import { User } from './user.entity'
import '../testing'

describe('UserResolver', () => {
  let loader: UserLoader
  let resolver: UserResolver
  let user: ReturnType<typeof createMockRepository>

  beforeEach(async () => {
    user = createMockRepository(User)

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserDataLoader, UserService, user]
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
    const dataLoader = await module.resolve<UserDataLoader>(UserDataLoader)
    loader = dataLoader.generateDataLoader()
  })

  it('should be defined', () => expect(resolver).toBeDefined())

  it('user', async () => {
    const users = await UserFactory.createList(1)
    user.useValue.find.mockReturnValueOnce(users)
    expect(await resolver.user({ id: users[0].id }, loader)).toEqual(users[0])
  })
})
