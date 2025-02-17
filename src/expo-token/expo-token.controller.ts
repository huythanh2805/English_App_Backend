import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpoTokenService } from './expo-token.service';
import { CreateExpoTokenDto } from './dto/create-expo-token.dto';
import { UpdateExpoTokenDto } from './dto/update-expo-token.dto';

@Controller('expo-token')
export class ExpoTokenController {
  constructor(private readonly expoTokenService: ExpoTokenService) {}

  @Post()
  create(@Body() createExpoTokenDto: CreateExpoTokenDto) {
    return this.expoTokenService.create(createExpoTokenDto);
  }

  @Get()
  findAll() {
    return this.expoTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expoTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpoTokenDto: UpdateExpoTokenDto) {
    return this.expoTokenService.update(+id, updateExpoTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expoTokenService.remove(+id);
  }
}
