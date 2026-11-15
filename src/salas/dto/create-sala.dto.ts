import { IsIn, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSalaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @Min(1)
  capacidad: number;

  @IsString()
  @IsIn(['2D', '3D', 'IMAX'])
  tipo: string;
}
