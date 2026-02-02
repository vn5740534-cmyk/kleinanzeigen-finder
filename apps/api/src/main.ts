import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the web app
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  // Run on port 3001
  await app.listen(3001);
  console.log(`API server is running on: http://localhost:3001`);
}
bootstrap();
