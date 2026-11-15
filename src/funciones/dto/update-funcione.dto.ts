import { PartialType } from '@nestjs/swagger';
import { CreateFuncioneDto } from './create-funcione.dto.js';

export class UpdateFuncioneDto extends PartialType(CreateFuncioneDto) {}
