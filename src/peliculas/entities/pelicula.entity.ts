import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Genero } from '../../generos/entities/genero.entity.js';
import { Funcion } from '../../funciones/entities/funcion.entity.js';

@Entity('peliculas')
export class Pelicula {
  @PrimaryGeneratedColumn()
  idPelicula: number;

  @Column({ type: 'varchar', length: 150 })
  titulo: string;

  @Column({ type: 'text' })
  sinopsis: string;

  @Column({ type: 'int' })
  duracionMin: number;

  @Column({ type: 'varchar', length: 10 })
  clasificacion: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToMany(() => Genero, (genero) => genero.peliculas)
  @JoinTable({
    name: 'pelicula_genero',
    joinColumn: {
      name: 'idPelicula',
      referencedColumnName: 'idPelicula',
    },
    inverseJoinColumn: {
      name: 'idGenero',
      referencedColumnName: 'idGenero',
    },
  })
  generos: Relation<Genero[]>;

  @OneToMany(() => Funcion, (funcion) => funcion.pelicula)
  funciones: Relation<Funcion[]>;
}
