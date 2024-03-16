import { NestFactory } from '@nestjs/core';
import { CakeModule } from './cake.module';

async function bootstrap() {
  const app = await NestFactory.create(CakeModule);
  await app.listen(3000);
}
bootstrap();
