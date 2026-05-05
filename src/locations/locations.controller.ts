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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({ summary: 'Crear una nueva ubicación (refugio)' })
  @ApiResponse({ status: 201, description: 'Location creada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  create(@Body() dto: CreateLocationDto) {
    return this.locationsService.create(dto);
  }

  @ApiOperation({ summary: 'Listar todas las ubicaciones' })
  @ApiResponse({ status: 200, description: 'Array de locations' })
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una ubicación por UUID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Location encontrada' })
  @ApiResponse({ status: 404, description: 'Location no encontrada' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.locationsService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar una ubicación' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Location actualizada' })
  @ApiResponse({ status: 404, description: 'Location no encontrada' })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLocationDto,
  ) {
    return this.locationsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar una ubicación' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Location eliminada' })
  @ApiResponse({ status: 404, description: 'Location no encontrada' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.locationsService.remove(id);
  }
}
