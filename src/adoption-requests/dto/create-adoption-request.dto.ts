import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateAdoptionRequestDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'UUID del usuario que solicita la adopción',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'UUID del animal a adoptar',
  })
  @IsUUID()
  animalId: string;

  @ApiPropertyOptional({
    example: 'Tengo patio grande y experiencia con perros',
    description: 'Mensaje opcional para el refugio (máx 500 caracteres)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;
}
