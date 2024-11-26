import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator"


export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3, {
        message: "Name is too short"
    })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(3, {
        message: "Password is too short"
    })
    password: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsOptional()
    photo: string;

}
