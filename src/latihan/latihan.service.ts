import { Injectable } from '@nestjs/common';

@Injectable()
export class LatihanService {
  getlatihan() {
    return {
      message: 'Latihan',
    };
  }
}
