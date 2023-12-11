import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { ICreateCustomerRequest } from './interfaces/create-customer-request';
import { IUpdateCustomerRequest } from './interfaces/update-customer-request';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async findAll() {
    try {
      const items = await this.customerRepository.find({
        where: { active: 1 },
        relations: ['store'],
      });
      return { success: true, data: { items: items } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: ICreateCustomerRequest) {
    try {
      const item = await this.customerRepository.save(data);
      const itemCreated = await this.customerRepository.findOne({
        where: { customerId: item.customerId },
        relations: ['store'],
      });
      return { success: true, data: { item: itemCreated } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(data: IUpdateCustomerRequest) {
    try {
      const item = await this.customerRepository.update(
        { customerId: data.customerId },
        data,
      );
      if (!item.affected) throw new Error('Error updating');
      const itemUpdated = await this.customerRepository.findOne({
        where: { customerId: data.customerId },
        relations: ['store'],
      });
      return { success: true, data: { item: itemUpdated } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const item = await this.customerRepository.update(
        { customerId: id },
        { active: 0 },
      );
      if (!item.affected) throw new Error('Error deleting');
      return { success: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
