import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ICreateProductRequest } from './interfaces/create-product-request';
import { IUpdateProductRequest } from './interfaces/update-product-request';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('by-id/:id')
  findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }

  @Post()
  create(@Body() data: ICreateProductRequest) {
    return this.productService.create(data);
  }

  @Put()
  update(@Body() data: IUpdateProductRequest) {
    return this.productService.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
