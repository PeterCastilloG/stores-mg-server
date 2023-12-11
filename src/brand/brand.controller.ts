import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { ICreateBrandRequest } from './interfaces/create-brand-request';
import { IUpdateBrandRequest } from './interfaces/update-brand-request';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Post()
  create(@Body() data: ICreateBrandRequest) {
    return this.brandService.create(data);
  }

  @Put()
  update(@Body() data: IUpdateBrandRequest) {
    return this.brandService.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.brandService.delete(id);
  }
}
