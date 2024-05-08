import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto } from 'src/auth/dto/signin.dto';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() signInDto: SignInDto) {
    return this.userService.createUser(signInDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    try {
      return await this.userService.findOne(username);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; 
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
