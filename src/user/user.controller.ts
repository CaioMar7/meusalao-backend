import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) : Promise<IUser> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.index();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.show(Number(id));
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: number, @Body() updatedValues: UpdateUserDto) {
    return this.userService.update(+id, updatedValues);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
