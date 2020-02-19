import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { UserService } from './user.service';
import { User } from './user.entity';

@Injectable()
export class UserDataLoader implements NestDataLoader<string, User> {
  constructor(private readonly service: UserService) { }

  generateDataLoader(): DataLoader<string, User> {
    return new DataLoader<string, User>(keys => this.service.find(keys as string[]));
  }
}
