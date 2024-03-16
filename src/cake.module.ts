import { Module } from '@nestjs/common';
import { CakeController } from './cake.controller';
import { CakeService } from './cake.service';

@Module({
  imports: [],
  controllers: [CakeController],
  providers: [CakeService],
})
export class CakeModule {}
