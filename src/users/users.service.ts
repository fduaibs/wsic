import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DeleteUserOutput } from './dto/delete-user.output';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findUsersById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException(
        'Attempt to create a new user failed',
      );
    }

    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findUsersById(id);

    await this.userRepository.update(user, { ...data });

    const userUpdated = this.userRepository.create({ ...user, ...data });

    return userUpdated;
  }

  async deleteUser(id: string): Promise<DeleteUserOutput> {
    const user = await this.findUsersById(id);

    const deletedUser = await this.userRepository.delete(user);

    if (!deletedUser) {
      return { deleted: false };
    }

    return { deleted: true, user: user };
  }
}
