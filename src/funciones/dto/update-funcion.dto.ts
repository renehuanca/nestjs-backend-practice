import { PartialType } from '@nestjs/swagger';
import { CreateFuncionDto } from './create-funcion.dto.js';

export class UpdateFuncionDto extends PartialType(CreateFuncionDto) {}
