import { Factory } from 'typeorm-factory'
import { User } from './user.entity'

export const UserFactory = new Factory(User).sequence('name', (i) =>
  i.toString()
)
