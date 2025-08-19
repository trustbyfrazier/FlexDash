import { IsEmail, IsString, IsIn, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  // Optional so service can generate one if omitted
  @IsOptional()
  @IsString()
  password?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  // Use raw string, validated against allowed roles
  @IsIn(['ADMIN', 'STAFF'])
  role: string;
}
