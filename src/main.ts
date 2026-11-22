import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cine API')
    .setDescription('API para la venta de boletos de cine')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs-json',
    customSiteTitle: 'Cine API',
  });

  app.use(
    '/reference',
    apiReference({
      url: '/docs-json',
      theme: 'purple',
      pageTitle: 'Cine API',
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
