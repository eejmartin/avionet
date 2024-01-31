import { Exclude } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  IsDateString,
  IsPhoneNumber,
  IsOptional,
  IsNumber,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,20}$/;

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @MinLength(2, { message: 'First name must have at least 2 characters.' })
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must have at least 2 characters.' })
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @IsAlphanumeric('en-GB', {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsString()
  @IsEnum(['f', 'm', 'u'])
  @IsOptional()
  gender?: string = 'u';

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
  })
  password: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsPhoneNumber('MK', { message: 'Please enter valid phone number' })
  phone: string;

  @IsNumber()
  @IsOptional()
  @Exclude()
  roleId?: number;
}
