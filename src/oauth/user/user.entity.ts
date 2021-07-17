import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'text' })
  fullName: string;

  @Column({ nullable: false, type: 'text' })
  email: string;

  @Column({
    type: 'text',
    select: false,
    nullable: false,
  })
  hash: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(4)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  /**
   * - At least 1 uppercase letter
   * - at least 1 special character !@#$&*^()
   * - at least 1 number
   * - at least 1 lowercase letter
   * - min length 8
   * **/
  @Matches(/^(?=.*[A-Z].*)(?=.*[!@#$&*^()\-_])(?=.*[0-9].*)(?=.*[a-z].*).{8,}$/)
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
