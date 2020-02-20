import DataLoader from 'dataloader'
import { Injectable, Scope } from '@nestjs/common'
import { NestDataLoader } from 'nestjs-dataloader'
import { UserService } from './user.service'
import { User } from './user.entity'

export type UserLoader = DataLoader<string, User>

@Injectable({ scope: Scope.REQUEST })
export class UserDataLoader implements NestDataLoader<string, User> {
  constructor(private readonly service: UserService) {}

  generateDataLoader(): UserLoader {
    return new DataLoader(keys => this.service.find(keys))
  }
}
