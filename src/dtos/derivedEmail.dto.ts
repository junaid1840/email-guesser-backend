import { IsNotEmpty, IsString } from 'class-validator';

export class DerivedEmailDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  domain: string;
}
