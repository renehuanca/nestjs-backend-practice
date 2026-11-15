import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  sinopsis: string;

  @IsInt()
  @Min(1)
  duracionMin: number;

  @IsString()
  @IsIn(['ATP', '+13', '+18'])
  clasificacion: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  idGeneros?: number[];
}