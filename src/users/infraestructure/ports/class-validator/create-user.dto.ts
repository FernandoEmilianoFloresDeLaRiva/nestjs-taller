import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { CreateUserDtoI } from "src/users/domain/dtoI/create-user.dtoI";

export class CreateUserDto implements CreateUserDtoI {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsString()
    username: string;
    @ApiProperty()
    @IsString()
    passwordUser: string;
}