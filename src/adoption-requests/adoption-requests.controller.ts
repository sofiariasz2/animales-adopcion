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
import { AdoptionRequestsService } from './adoption-requests.service';
import { CreateAdoptionRequestDto } from './dto/create-adoption-request.dto';
import { UpdateAdoptionRequestDto } from './dto/update-adoption-request.dto';

@ApiTags('adoption-requests')
@Controller('adoption-requests')
export class AdoptionRequestsController {
  constructor(
    private readonly adoptionRequestsService: AdoptionRequestsService,
  ) {}

  @ApiOperation({
    summary: 'Crear solicitud de adopción',
    description:
      'Reglas de negocio: (1) el animal debe estar en estado "disponible", no "adoptado". (2) un usuario no puede tener una solicitud previa (pendiente o cualquier estado) para el mismo animal.',
  })
  @ApiResponse({ status: 201, description: 'Solicitud creada' })
  @ApiResponse({
    status: 400,
    description:
      'Datos inválidos, animal ya adoptado, o solicitud duplicada del mismo usuario para el mismo animal',
  })
  @ApiResponse({ status: 404, description: 'Usuario o animal no encontrado' })
  @Post()
  create(@Body() dto: CreateAdoptionRequestDto) {
    return this.adoptionRequestsService.create(dto);
  }

  @ApiOperation({ summary: 'Listar todas las solicitudes' })
  @ApiResponse({ status: 200, description: 'Array de solicitudes' })
  @Get()
  findAll() {
    return this.adoptionRequestsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una solicitud por UUID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptionRequestsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Aprobar o rechazar una solicitud',
    description:
      'Solo acepta los valores "aprobada" o "rechazada". Si es "aprobada", el animal asociado pasa automáticamente a estado "adoptado".',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Estado actualizado' })
  @ApiResponse({
    status: 400,
    description: 'Status inválido (debe ser "aprobada" o "rechazada")',
  })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAdoptionRequestDto,
  ) {
    return this.adoptionRequestsService.updateStatus(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar una solicitud' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Solicitud eliminada' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptionRequestsService.remove(id);
  }
}
