import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Boleto } from '../../boletos/entities/boleto.entity.js';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column({ type: 'varchar', length: 100 })
  nombres: string;

  @Column({ type: 'varchar', length: 100 })
  paterno: string;

  @Column({ type: 'varchar', length: 100 })
  materno: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(() => Boleto, (boleto) => boleto.cliente)
  boletos: Relation<Boleto[]>;
}
