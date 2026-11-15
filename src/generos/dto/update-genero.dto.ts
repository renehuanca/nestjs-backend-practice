import { PartialType } from '@nestjs/swagger';
import { CreateGeneroDto } from './create-genero.dto.js';

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {}
