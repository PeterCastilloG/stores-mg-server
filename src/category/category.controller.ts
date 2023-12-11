import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { CatergoryService } from './category.service';
import { ICreateCategoryRequest } from './interfaces/create-category-request';
import { IUpdateCategoryRequest } from './interfaces/update-category-request';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CatergoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  create(@Body() data: ICreateCategoryRequest) {
    return this.categoryService.create(data);
  }

  @Put()
  update(@Body() data: IUpdateCategoryRequest) {
    return this.categoryService.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
