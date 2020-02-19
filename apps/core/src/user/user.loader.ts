import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { UserService } from './user.service';
import { User } from './user.entity';

export type UserLoader = DataLoader<string, User>

@Injectable()
export class UserDataLoader implements NestDataLoader<string, User> {
  constructor(private readonly service: UserService) { }

  generateDataLoader(): UserLoader {
    return new DataLoader<string, User>(keys => this.service.find(keys as string[]));
  }
}
