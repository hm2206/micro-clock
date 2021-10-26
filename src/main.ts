import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(compression())

  // microservices
  await app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 5000
    }
  })

  await app.startAllMicroservices();
  await app.listen(AppModule.port, AppModule.host);
}
bootstrap();
