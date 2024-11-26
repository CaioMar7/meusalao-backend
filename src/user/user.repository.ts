import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {

    constructor(private readonly prisma: PrismaService) { }

    async getUserById(id: number): Promise<IUser> {
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            throw new BadRequestException('User has not found.');
        }

        return existingUser
    }

    async getUserByEmail(email: string): Promise<IUser> {
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new BadRequestException('Email already in use.');
        }

        return existingUser
    }

    async create(createUserDto: CreateUserDto): Promise<IUser> {

        this.getUserByEmail(createUserDto.email)

        const createdUser = await this.prisma.user.create({ data: createUserDto })

        return createdUser;

    }

    async findAll(): Promise<IUser[]> {
        return await this.prisma.user.findMany()
    }

    async findOneById(id: number): Promise<IUser> {
        return await this.getUserById(id)
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<IUser> {
        await this.getUserById(id)

        return await this.prisma.user.update({
            where: {
                id
            },
            data: updateUserDto
        })
    }

    async remove(id: number): Promise<IUser> {
        const existingUser = await this.getUserById(id)

        await this.prisma.user.delete({ where: { id } })

        return existingUser
    }
}
