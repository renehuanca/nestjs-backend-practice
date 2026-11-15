import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Sala } from '../../salas/entities/sala.entity.js';
import { Pelicula } from '../../peliculas/entities/pelicula.entity.js';
import { Boleto } from '../../boletos/entities/boleto.entity.js';

@Entity('funciones')
export class Funcion {
  @PrimaryGeneratedColumn()
  idFuncion: number;

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Sala, (sala) => sala.funciones)
  @JoinColumn({ name: 'idSala' })
  sala: Sala;

  @ManyToOne(() => Pelicula, (pelicula) => pelicula.funciones)
  @JoinColumn({ name: 'idPelicula' })
  pelicula: Pelicula;

  @OneToMany(() => Boleto, (boleto) => boleto.funcion)
  boletos: Boleto[];
}
