import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { ICreateProductHistoryRequest } from './interfaces/create-product-history-request';
import { IUpdateProductHistoryRequest } from './interfaces/update-product-history-request';
import { ProductHistoryService } from './product-history.service';

@Controller('product-history')
export class ProductHistoryController {
  constructor(private readonly productHistoryService: ProductHistoryService) {}

  @Post()
  create(@Body() data: ICreateProductHistoryRequest) {
    return this.productHistoryService.create(data);
  }

  @Put()
  update(@Body() data: IUpdateProductHistoryRequest) {
    return this.productHistoryService.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productHistoryService.delete(id);
  }
}
