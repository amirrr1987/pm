import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      always: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  create(@Body() dto: UserDTO.CreateOne.Request) {
    return this.usersService.create(dto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: UserDTO.FindOne.Request) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      always: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  update(
    @Param('id', new ParseIntPipe()) id: UserDTO.UpdateOne.Request['id'],
    @Body() dto: UserDTO.UpdateOne.Request,
  ) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  remove(@Param('id', new ParseIntPipe()) id: UserDTO.DeleteOne.Request) {
    return this.usersService.remove(id);
  }
}
