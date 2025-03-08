import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnglishSentenceService } from './english-sentence.service';
import { CreateEnglishSentenceDto } from './dto/create-english-sentence.dto';
import { UpdateEnglishSentenceDto } from './dto/update-english-sentence.dto';

@Controller('english-sentence')
export class EnglishSentenceController {
  constructor(private readonly englishSentenceService: EnglishSentenceService) {}

  @Post()
  create(@Body() createEnglishSentenceDto: CreateEnglishSentenceDto) {
    return this.englishSentenceService.create(createEnglishSentenceDto);
  }

  @Get()
  findAll() {
    return this.englishSentenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.englishSentenceService.findOne(+id);
  }
  @Get(':id/my-sentence')
  getUserSentences(@Param('id') userId: string) {
    return this.englishSentenceService.getUserSentences(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnglishSentenceDto: UpdateEnglishSentenceDto) {
    return this.englishSentenceService.update(+id, updateEnglishSentenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.englishSentenceService.remove(id);
  }
}
