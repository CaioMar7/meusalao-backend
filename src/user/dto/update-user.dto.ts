import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator"


export class UpdateUserDto {

    @IsNotEmpty()
    @MinLength(3, {
        message: "Name is too short"
    })
    name: string;

    @IsNotEmpty()
    @MinLength(3, {
        message: "Password is too short"
    })
    password: string;

    @IsOptional()
    confirmPassword?: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsOptional()
    photo: string;

}
