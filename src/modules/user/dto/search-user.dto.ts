import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class SearchUsersDto {
  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsPhoneNumber('MK', { message: 'Please enter valid phone number' })
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsOptional()
  companyId?: number;

  @IsNumber()
  @IsOptional()
  roleId?: number;

  @IsNumber()
  @IsOptional()
  campaignId?: number;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsString()
  @IsEnum(['f', 'm', 'u'])
  @IsOptional()
  gender?: string = 'u';
}
