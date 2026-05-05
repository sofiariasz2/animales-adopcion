import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAnimalDto {
  @ApiProperty({ example: 'Luna', description: 'Nombre del animal' })
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 'perro',
    description: 'Especie del animal (texto libre, ej. "perro", "gato", "conejo")',
  })
  @IsString()
  especie: string;

  @ApiProperty({ example: 18, description: 'Edad en meses' })
  @IsInt()
  @Min(0)
  edad: number;

  @ApiProperty({
    example: 'Labrador dorada, muy activa y cariñosa',
    description: 'Descripción del animal (mínimo 10 caracteres)',
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  descripcion: string;

  @ApiPropertyOptional({
    example: 'disponible',
    enum: ['disponible', 'adoptado'],
    default: 'disponible',
  })
  @IsOptional()
  @IsIn(['disponible', 'adoptado'])
  estado?: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/...',
    description: 'URL de la imagen del animal',
  })
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiProperty({
    example: 'contacto@refugio.com',
    description: 'Email de contacto del refugio',
  })
  @IsEmail()
  contacto: string;

  @ApiPropertyOptional({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'UUID de la ubicación',
  })
  @IsOptional()
  @IsUUID()
  locationId?: string;

  @ApiPropertyOptional({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'UUID del usuario que registra al animal',
  })
  @IsOptional()
  @IsUUID()
  registeredById?: string;
}
