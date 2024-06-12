import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: "Email is required." })
  @IsEmail({}, { message: "Invalid email format." })
  @IsString()
  email: string;

  @IsNotEmpty({ message: "Password is required." })
  @IsString()
  password: string;
}