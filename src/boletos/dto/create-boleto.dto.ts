import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateBoletoDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idFuncion: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  idCliente: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  numeroAsiento: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precioPagado?: number;
}