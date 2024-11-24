import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters long.' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters.' })
  first_name: string;

  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters long.' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters.' })
  last_name: string;

  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters long.' })
  @MaxLength(30, { message: 'Username must not exceed 30 characters.' })
  username: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

/* eslint-disable @typescript-eslint/no-namespace */
export namespace UserDTO {
  export namespace GetAll {
    export type Response = UpdateUserDto[];
  }
  export namespace CreateOne {
    export class Request extends CreateUserDto {}
    export type Response = CreateUserDto;
  }
  export namespace FindOne {
    export type Request = UpdateUserDto['id'];
    export type Response = UpdateUserDto;
  }
  export namespace UpdateOne {
    export class Request extends UpdateUserDto {}
    export type Response = UpdateUserDto;
  }
  export namespace DeleteOne {
    export type Request = UpdateUserDto['id'];
    export type Response = UpdateUserDto;
  }
}
