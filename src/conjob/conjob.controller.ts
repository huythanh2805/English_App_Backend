import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConjobService } from './conjob.service';
import { CreateConjobDto } from './dto/create-conjob.dto';
import { UpdateConjobDto } from './dto/update-conjob.dto';

@Controller('conjob')
export class ConjobController {
  constructor(private readonly conjobService: ConjobService) {}
   
  @Get()
  getCronJobs() {
    return this.conjobService.getAllTaks()
  }


  @Post()
  create(@Body() createConjobDto: CreateConjobDto) {
    return this.conjobService.create(createConjobDto);
  }

  @Post('/stop')
  stop(@Body() stopDto: CreateConjobDto) {
    return this.conjobService.stop(stopDto.name);
  }
  @Post('/start')
  start(@Body() startDto: CreateConjobDto) {
    return this.conjobService.start(startDto.name);
  }
}
