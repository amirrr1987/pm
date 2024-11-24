import { PartialType } from '@nestjs/mapped-types';

class CreateUserDto {
  id: string;
}

class UpdateUserDto extends PartialType(CreateUserDto) {}

/* eslint-disable @typescript-eslint/no-namespace */
export namespace ResponseDTO {
  export namespace GetAll {
    export type Response = UpdateUserDto[];
  }
  export namespace CreateOne {
    export type Request = CreateUserDto;
    export type Response = CreateUserDto;
  }
  export namespace FindOne {
    export type Request = UpdateUserDto['id'];
    export type Response = UpdateUserDto;
  }
  export namespace UpdateOne {
    export type Request = UpdateUserDto;
    export type Response = UpdateUserDto;
  }
  export namespace DeleteOne {
    export type Request = UpdateUserDto['id'];
    export type Response = UpdateUserDto;
  }
}
