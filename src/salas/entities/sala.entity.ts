import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Funcion } from '../../funciones/entities/funcion.entity.js';

@Entity('salas')
export class Sala {
  @PrimaryGeneratedColumn()
  idSala: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'int' })
  capacidad: number;

  @Column({ type: 'varchar', length: 20 })
  tipo: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(() => Funcion, (funcion) => funcion.sala)
  funciones: Funcion[];
}