import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto, User } from './user.entity';
import { Repository } from 'typeorm';
import { pbkdf2, pbkdf2Sync, randomBytes } from 'crypto';

@Injectable()
export class UserService {
  private readonly HASH_ITERATIONS = 15000;
  private readonly KEY_LEN = 32;

  constructor(
    @InjectRepository(User) private readonly _repo: Repository<User>,
  ) {}

  findOne(id: string) {
    return this._repo.findOneOrFail(id);
  }

  async register(dto: RegisterUserDto) {
    const salt = randomBytes(12).toString('base64');
    const key = await new Promise<string>((resolve, reject) => {
      pbkdf2(
        dto.password,
        salt,
        this.HASH_ITERATIONS,
        this.KEY_LEN,
        'sha256',
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.toString('base64'));
          }
        },
      );
    });

    const hash = `pbkdf2_sha256$${this.HASH_ITERATIONS}$${salt}$${key}`;

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

    if (!user || !this._compare(password, user.hash)) {
      throw new UnauthorizedException();
    }
    delete user.hash;
    return user;
  }

  private _compare(password, hash) {
    if (!hash.startsWith('pbkdf2_')) {
      return false;
    }
    const parts = hash.split('$');
    const iterations = +parts[1];
    const salt = parts[2];
    const digest = parts[0].split('_')[1];
    return (
      pbkdf2Sync(password, salt, iterations, this.KEY_LEN, digest).toString(
        'base64',
      ) === parts[3]
    );
  }
}
