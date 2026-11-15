import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeneroDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}