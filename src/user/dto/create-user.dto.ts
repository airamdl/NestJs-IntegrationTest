import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;
    
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;
}