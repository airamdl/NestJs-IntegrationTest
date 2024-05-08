import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from 'src/auth/dto/signin.dto';

export class UpdateUserDto extends PartialType(SignInDto) {}
