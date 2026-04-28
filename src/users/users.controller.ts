import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  // ── ManyToMany: Favoritos ──────────────────────────────

  @Get(':id/favorites')
  getFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getFavorites(id);
  }

  @Post(':userId/favorites/:animalId')
  addFavorite(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('animalId', ParseUUIDPipe) animalId: string,
  ) {
    return this.usersService.addFavorite(userId, animalId);
  }

  @Delete(':userId/favorites/:animalId')
  removeFavorite(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('animalId', ParseUUIDPipe) animalId: string,
  ) {
    return this.usersService.removeFavorite(userId, animalId);
  }
}
