import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): { message: string } {
    return {
      message: 'Welcome to Kleinanzeigen Finder API',
    };
  }

  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
