import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Funcion } from '../../funciones/entities/funcion.entity.js';
import { Cliente } from '../../clientes/entities/cliente.entity.js';

@Entity('boletos')
@Unique('UQ_funcion_asiento', ['funcion', 'numeroAsiento'])
export class Boleto {
  @PrimaryGeneratedColumn()
  idBoleto: number;

  @Column({ type: 'int' })
  numeroAsiento: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioPagado: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Funcion, (funcion) => funcion.boletos)
  @JoinColumn({ name: 'idFuncion' })
  funcion: Funcion;

  @ManyToOne(() => Cliente, (cliente) => cliente.boletos)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;
}
