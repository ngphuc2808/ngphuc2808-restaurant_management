import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
  IsNumber,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';

import { Role } from '@/constants/type';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(256)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsEnum([Role.Owner, Role.Employee])
  @IsOptional()
  role?: string;

  @IsNumber()
  @IsOptional()
  ownerId?: number;
}
