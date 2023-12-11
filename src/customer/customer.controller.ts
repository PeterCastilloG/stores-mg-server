import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ICreateCustomerRequest } from './interfaces/create-customer-request';
import { IUpdateCustomerRequest } from './interfaces/update-customer-request';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Post()
  create(@Body() data: ICreateCustomerRequest) {
    return this.customerService.create(data);
  }

  @Put()
  update(@Body() data: IUpdateCustomerRequest) {
    return this.customerService.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.customerService.delete(id);
  }
}
