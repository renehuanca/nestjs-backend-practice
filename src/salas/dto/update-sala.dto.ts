import { PartialType } from '@nestjs/swagger';
import { CreateSalaDto } from './create-sala.dto.js';

export class UpdateSalaDto extends PartialType(CreateSalaDto) {}
