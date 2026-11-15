import { PartialType } from '@nestjs/swagger';
import { CreateBoletoDto } from './create-boleto.dto.js';

export class UpdateBoletoDto extends PartialType(CreateBoletoDto) {}
