import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpectationFiler } from './filters/expection.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.useGlobalFilters(new ExpectationFiler());

  await app.listen(3002);
}
bootstrap();
