import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { ICreateStoreRequest } from './interfaces/create-store-request';
import { IUpdateStoreRequest } from './interfaces/update-store-request';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Post()
  create(@Body() data: ICreateStoreRequest) {
    return this.storeService.create(data);
  }

  @Put()
  update(@Body() data: IUpdateStoreRequest) {
    return this.storeService.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.storeService.delete(id);
  }
}
