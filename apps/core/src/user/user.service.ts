import { Injectable } from '@nestjs/common'
import { In } from 'typeorm'
import { UserRepository } from './user.entity'

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async find(ids: readonly string[]) {
    return this.repo.find({
      where: { id: In(ids as string[]) }
    })
  }
}
