import { getCustomRepository } from 'typeorm'
import { UserService } from './user.service'
import { UserRepository } from './user.entity'
import '../testing'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    service = new UserService(getCustomRepository(UserRepository))
  })

  it('should be defined', () => expect(service).toBeDefined())
})
