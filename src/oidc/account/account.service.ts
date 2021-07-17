import { Injectable } from '@nestjs/common';
import { UserService } from '../../oauth/user/user.service';
import { FindAccount } from 'oidc-provider';

@Injectable()
export class AccountService {
  constructor(private userService: UserService) {
  }

  findAccount: FindAccount = async (ctx, id: string) => {
    const user = await this.userService.findOne(id);

    if (!user) {
      return undefined;
    }

    return {
      accountId: id,
      async claims() {
        return {
          sub: user.email,
          email: user.email,
          fullName: user.fullName,
        };
      },
    };
  };

  async authenticate(email, password) {
    const user = await this.userService.authenticate(email, password);

    return user.id;
  }
}
