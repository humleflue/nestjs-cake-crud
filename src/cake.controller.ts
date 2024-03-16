import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Cake, CakeService } from './cake.service';

@Controller('cakes')
export class CakeController {
  constructor(private readonly cakeService: CakeService) {}

  @Get()
  getCakes(): Cake[] {
    return this.cakeService.getCakes();
  }

  @Get(':id')
  getCakeById(@Param() { id }: any): Cake | undefined {
    // TODO: Wow this is ugly...
    // the call: this.cakeService.getCakeById(id) is allowed by TS but won't work as id will be a string
    const idAsNumber = parseInt(id)
    return this.cakeService.getCakeById(idAsNumber);
  }

  @Put(':id')
  updateCake(@Param() { id }: any, @Body() cake: Cake): Cake | undefined {
    const idAsNumber = parseInt(id)
    cake.id = idAsNumber
    return this.cakeService.updateCake(cake);
  }

  @Delete(':id')
  deleteCake(@Param() { id }: any): void {
    const idAsNumber = parseInt(id)
    return this.cakeService.removeCake(idAsNumber)
  }

  @Post()
  addCake(@Body() cake: Cake): void {
    return this.cakeService.addCake(cake)
  }
}
