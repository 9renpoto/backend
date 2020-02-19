import { UserFactory } from './user.factory'
import '../testing'

describe('UserEntity', () => {
  it('factory', async () => {
    expect(await UserFactory.create()).toBeDefined()
  })
})
