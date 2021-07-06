import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto, User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _repo: Repository<User>,
  ) {}

  findOne(id: string) {
    return this._repo.findOneOrFail(id);
  }

  async register(dto: RegisterUserDto) {
    const hash = await bcrypt.hash(dto.password, 12);

    return await this._repo
      .save({
        fullName: dto.fullName,
        email: dto.email,
        hash,
      })
      .then((user) => {
        delete user.hash;
        return user;
      });
  }

  async authenticate(email, password) {
    const user = await this._repo.findOneOrFail(
      { email },
      { select: ['email', 'hash', 'id', 'fullName'] },
    );

    if (!user || !(await bcrypt.compare(password, user.hash))) {
      throw new UnauthorizedException();
    }
    delete user.hash;
    return user;
  }
}
