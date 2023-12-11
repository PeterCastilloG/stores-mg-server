import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { WareHouseService } from './warehouse.service';
import { ICreateWareHouseRequest } from './interfaces/create-warehouse-request';
import { IUpdateWareHouseRequest } from './interfaces/update-warehouse-request';

@Controller('warehouses')
export class WareHouseController {
  constructor(private readonly warehouseService: WareHouseService) {}

  @Get()
  findAll() {
    return this.warehouseService.findAll();
  }

  @Post()
  create(@Body() data: ICreateWareHouseRequest) {
    return this.warehouseService.create(data);
  }

  @Put()
  update(@Body() data: IUpdateWareHouseRequest) {
    return this.warehouseService.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.warehouseService.delete(id);
  }
}
