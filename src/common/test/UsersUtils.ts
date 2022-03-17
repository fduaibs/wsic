import { User } from '../../users/entities/user.entity';

export default class UsersUtils {
  static getValidUser(): User {
    const user = new User();

    user.id = '1';
    user.name = 'Valid Name';
    user.email = 'valid@email.com';

    return user;
  }
}
