import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from "bcrypt"
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto): Promise<IUser> {

    const createUserDtoWithPassword = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    }

    const createdUser = await this.userRepository.create(createUserDtoWithPassword)

    return createdUser;

  }

  async index(): Promise<IUser[]> {
    return await this.userRepository.findAll()
  }

  async show(id: number): Promise<IUser> {
    return await this.userRepository.findOneById(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userRepository.findOneById(id)

    const updatedValues = {
      name: updateUserDto.name ?? existingUser.name,
      phone: updateUserDto.phone ?? existingUser.phone,
      password: await bcrypt.hash(updateUserDto.password, 10) ?? existingUser.password,
      photo: updateUserDto.photo ?? existingUser.photo
    }

    if (updateUserDto.password !== updateUserDto.confirmPassword) {
      throw new BadRequestException('Password and confirm password dont match.');
    }

    await this.userRepository.update(id, updatedValues)

    const updatedUser = {
      id: existingUser.id,
      email: existingUser.email,
      ...updatedValues
    }

    return updatedUser
  }

  async remove(id: number): Promise<IUser> {
    return this.userRepository.remove(id)
  }
}
