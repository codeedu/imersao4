import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  subdomain: string;
}
