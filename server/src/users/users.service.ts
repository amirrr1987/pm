import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './user.entity'; // Your entity file path
import { UserDTO } from './user.dto';
import { ResponseService } from 'src/response/response.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly responseService: ResponseService,
  ) {}

  async create(dto: UserDTO.CreateOne.Request) {
    try {
      const result = await this.userRepository.save(dto);
      return this.responseService.createOne('users', result.id);
    } catch (error) {
      throw this.responseService.error(error);
    }
  }

  async findAll() {
    try {
      const result = await this.userRepository.find();
      return this.responseService.findAll('users', result);
    } catch (error) {
      throw this.responseService.error(error);
    }
  }

  async findOne(id: UserDTO.FindOne.Request) {
    try {
      const result = await this.userRepository.findOne({ where: { id } });
      return this.responseService.findOne('user', result);
    } catch (error) {
      console.log(error);
      throw this.responseService.error(error);
    }
  }

  async update(
    id: UserDTO.UpdateOne.Request['id'],
    dto: UserDTO.UpdateOne.Request,
  ) {
    try {
      const result = await this.userRepository.update(id, dto);
      if (result.affected === 0) {
        return this.responseService.notFound('user', id);
      }
      return this.responseService.updateOne('user', id);
    } catch (error) {
      throw this.responseService.error(error);
    }
  }

  async remove(id: UserDTO.DeleteOne.Request) {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        return this.responseService.notFound('user', id);
      }
      return this.responseService.remove('user', id);
    } catch (error) {
      throw this.responseService.error(error);
    }
  }
}
