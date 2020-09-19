import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(2)
  fullname: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
