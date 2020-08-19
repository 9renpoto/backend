import { Test, TestingModule } from '@nestjs/testing'
import '../testing'
import { createMockRepository } from '../testing/entity'
import { User } from './user.entity'
import { UserFactory } from './user.factory'
import { UserDataLoader, UserLoader } from './user.loader'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

describe('UserDataLoader', () => {
  let loader: UserLoader
  let service: UserService
  let user: ReturnType<typeof createMockRepository>

  beforeEach(async () => {
    user = createMockRepository(User)
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserDataLoader, UserService, user],
    }).compile()

    const dataLoader = await module.resolve<UserDataLoader>(UserDataLoader)
    loader = dataLoader.generateDataLoader()
    service = module.get(UserService)
    loader.clearAll()
  })

  it('load', async () => {
    const users = await UserFactory.createList(1)
    user.useValue.find.mockReturnValueOnce(users)

    expect(await loader.load(users[0].id)).toEqual(users[0])
  })
})
