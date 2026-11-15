import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Pelicula } from '../../peliculas/entities/pelicula.entity.js';

@Entity('generos')
export class Genero {
  @PrimaryGeneratedColumn()
  idGenero: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToMany(() => Pelicula, (pelicula) => pelicula.generos)
  peliculas: Relation<Pelicula[]>;
}
