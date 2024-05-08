import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
  findAll() {
    return `This action returns all user`;
  }
  

  async findOne(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { id } });
}
  findUserById(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
