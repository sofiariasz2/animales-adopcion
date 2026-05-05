import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'María Pérez', description: 'Nombre completo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'maria@example.com', description: 'Email único' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+57 300 123 4567', description: 'Teléfono' })
  @IsOptional()
  @IsString()
  phone?: string;
}
