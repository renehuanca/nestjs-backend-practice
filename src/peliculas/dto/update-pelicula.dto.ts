import { PartialType } from '@nestjs/swagger';
import { CreatePeliculaDto } from './create-pelicula.dto.js';

export class UpdatePeliculaDto extends PartialType(CreatePeliculaDto) {}
