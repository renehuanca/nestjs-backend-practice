import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SalasModule } from './salas/salas.module.js';
import { GenerosModule } from './generos/generos.module.js';
import { PeliculasModule } from './peliculas/peliculas.module.js';
import { FuncionesModule } from './funciones/funciones.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { BoletosModule } from './boletos/boletos.module.js';

try {
  process.loadEnvFile();
} catch {
  // Sin archivo .env: se usan las variables de entorno del sistema.
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASSWORD ?? 'password',
      database: process.env.DB_NAME ?? 'practica',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SalasModule,
    GenerosModule,
    PeliculasModule,
    FuncionesModule,
    ClientesModule,
    BoletosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
