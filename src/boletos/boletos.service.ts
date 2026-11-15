import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Boleto } from './entities/boleto.entity.js';
import { Funcion } from '../funciones/entities/funcion.entity.js';
import { Cliente } from '../clientes/entities/cliente.entity.js';
import { CreateBoletoDto } from './dto/create-boleto.dto.js';
import { UpdateBoletoDto } from './dto/update-boleto.dto.js';

@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto)
    private readonly boletoRepository: Repository<Boleto>,

    @InjectRepository(Funcion)
    private readonly funcionRepository: Repository<Funcion>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createBoletoDto: CreateBoletoDto): Promise<Boleto> {
    const { idFuncion, idCliente, numeroAsiento, precioPagado } =
      createBoletoDto;

    const funcion = await this.funcionRepository.findOne({
      where: { idFuncion },
      relations: { sala: true },
    });

    if (!funcion) {
      throw new NotFoundException(
        `La función con id ${idFuncion} no existe`,
      );
    }

    const cliente = await this.clienteRepository.findOne({
      where: { idCliente },
    });

    if (!cliente) {
      throw new NotFoundException(
        `El cliente con id ${idCliente} no existe`,
      );
    }

    if (numeroAsiento < 1 || numeroAsiento > funcion.sala.capacidad) {
      throw new BadRequestException(
        `El asiento debe estar entre 1 y ${funcion.sala.capacidad}`,
      );
    }

    const boletoExistente = await this.boletoRepository.findOne({
      where: {
        funcion: { idFuncion },
        numeroAsiento,
      },
    });

    if (boletoExistente) {
      throw new BadRequestException(
        `El asiento ${numeroAsiento} ya está ocupado para esta función`,
      );
    }

    const boleto = this.boletoRepository.create({
      numeroAsiento,
      precioPagado: precioPagado ?? funcion.precio,
      funcion,
      cliente,
    });

    return this.boletoRepository.save(boleto);
  }

  async findAll(): Promise<Boleto[]> {
    return this.boletoRepository.find({
      relations: { funcion: true, cliente: true },
    });
  }

  async findOne(id: number): Promise<Boleto> {
    const boleto = await this.boletoRepository.findOne({
      where: { idBoleto: id },
      relations: { funcion: { sala: true }, cliente: true },
    });

    if (!boleto) {
      throw new NotFoundException(`El boleto con id ${id} no existe`);
    }

    return boleto;
  }

  async update(
    id: number,
    updateBoletoDto: UpdateBoletoDto,
  ): Promise<Boleto> {
    const boleto = await this.findOne(id);

    const numeroAsiento =
      updateBoletoDto.numeroAsiento ?? boleto.numeroAsiento;

    const capacidad = boleto.funcion.sala.capacidad;

    if (numeroAsiento < 1 || numeroAsiento > capacidad) {
      throw new BadRequestException(
        `El asiento debe estar entre 1 y ${capacidad}`,
      );
    }

    const boletoExistente = await this.boletoRepository.findOne({
      where: {
        funcion: { idFuncion: boleto.funcion.idFuncion },
        numeroAsiento,
      },
    });

    if (
      boletoExistente &&
      boletoExistente.idBoleto !== boleto.idBoleto
    ) {
      throw new BadRequestException(
        `El asiento ${numeroAsiento} ya está ocupado para esta función`,
      );
    }

    boleto.numeroAsiento = numeroAsiento;

    if (updateBoletoDto.precioPagado !== undefined) {
      boleto.precioPagado = updateBoletoDto.precioPagado;
    }

    return this.boletoRepository.save(boleto);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.boletoRepository.softDelete(id);

    return {
      mensaje: `El boleto con id ${id} fue anulado correctamente`,
    };
  }
}