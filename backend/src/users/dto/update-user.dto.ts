import {
  IsEmail,
  IsOptional,
  MinLength,
  IsString,
  IsIn,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @MinLength(6)
  @IsOptional()
  password?: string;

  // Keep role as string for Prisma connect({ name })
  @IsIn(['ADMIN', 'STAFF'])
  @IsOptional()
  role?: string;
}
