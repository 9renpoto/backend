import { Injectable } from '@nestjs/common'
import DataLoader from 'dataloader'
import { NestDataLoader } from 'nestjs-dataloader'
import { User } from './user.entity'
import { UserService } from './user.service'

export type UserLoader = DataLoader<string, User>

@Injectable()
export class UserDataLoader implements NestDataLoader<string, User> {
  constructor(private readonly service: UserService) {}

  generateDataLoader(): any {
    // DataLoader<string, User> {
    return new DataLoader<string, User>((keys) => this.service.find(keys))
  }
}
