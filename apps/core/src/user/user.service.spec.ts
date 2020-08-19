import { random } from 'faker'
import { getCustomRepository } from 'typeorm'
import '../testing'
import { UserRepository } from './user.entity'
import { UserFactory } from './user.factory'
import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService

  beforeEach(() => {
    service = new UserService(getCustomRepository(UserRepository))
  })

  it('should be defined', () => expect(service).toBeDefined())

  it('find', async () => {
    const user = await UserFactory.create()
    expect(await service.find([user.id, random.uuid()])).toHaveLength(1)
  })
})
