import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateFuncionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idSala: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  idPelicula: number;

  @IsDateString()
  fechaHora: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio: number;
}
