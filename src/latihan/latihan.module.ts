import { Module } from '@nestjs/common';
import { LatihanController } from './latihan.controller';
import { LatihanService } from './latihan.service';

@Module({
  controllers: [LatihanController],
  providers: [LatihanService],
})
export class LatihanModule {}
