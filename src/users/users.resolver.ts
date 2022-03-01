import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './entities/user.entity';

import { UsersService } from './users.service';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DeleteUserOutput } from './dto/delete-user.output';

@Resolver()
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAllUsers();

    return users;
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findUsersById(id);

    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(data);

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, data);

    return user;
  }

  @Mutation(() => DeleteUserOutput)
  async deleteUser(@Args('id') id: string): Promise<DeleteUserOutput> {
    const deletedUser = await this.userService.deleteUser(id);

    return deletedUser;
  }
}
