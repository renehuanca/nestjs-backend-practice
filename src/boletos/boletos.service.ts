import { Injectable } from '@nestjs/common';
import { CreateBoletoDto } from './dto/create-boleto.dto.js';
import { UpdateBoletoDto } from './dto/update-boleto.dto.js';

@Injectable()
export class BoletosService {
  create(createBoletoDto: CreateBoletoDto) {
    return 'This action adds a new boleto';
  }

  findAll() {
    return `This action returns all boletos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boleto`;
  }

  update(id: number, updateBoletoDto: UpdateBoletoDto) {
    return `This action updates a #${id} boleto`;
  }

  remove(id: number) {
    return `This action removes a #${id} boleto`;
  }
}
