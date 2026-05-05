import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 'Refugio Patitas Felices', description: 'Nombre del refugio' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Bogotá', description: 'Ciudad' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Calle 100 #15-20', description: 'Dirección física' })
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: '+57 300 123 4567', description: 'Teléfono de contacto' })
  @IsOptional()
  @IsString()
  phone?: string;
}
