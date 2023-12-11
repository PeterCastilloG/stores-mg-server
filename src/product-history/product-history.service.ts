import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductHistoryEntity } from './product-history.entity';
import { IUpdateProductHistoryRequest } from './interfaces/update-product-history-request';
import { ICreateProductHistoryRequest } from './interfaces/create-product-history-request';

@Injectable()
export class ProductHistoryService {
  constructor(
    @InjectRepository(ProductHistoryEntity)
    private readonly productHistoryRepository: Repository<ProductHistoryEntity>,
  ) {}

  async create(data: ICreateProductHistoryRequest) {
    try {
      if (data.quantity < data.used) {
        throw new Error('Cantidad en uso es mayor al total');
      }
      if (new Date(data.expiryDate).getTime() < new Date().getTime()) {
        throw new Error('La fecha de caducidad ya paso');
      }
      const item = await this.productHistoryRepository.save(data);
      const itemCreated = await this.productHistoryRepository.findOne({
        where: { productHistoryId: item.productHistoryId },
        relations: ['product', 'warehouse'],
      });
      return { success: true, data: { item: itemCreated } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(data: IUpdateProductHistoryRequest) {
    try {
      if (data.quantity < data.used) {
        throw new Error('Cantidad en uso es mayor al total');
      }
      const item = await this.productHistoryRepository.update(
        { productHistoryId: data.productHistoryId },
        data,
      );
      if (!item.affected) throw new Error('Error updating');
      const itemUpdated = await this.productHistoryRepository.findOne({
        where: { productHistoryId: data.productHistoryId },
        relations: ['product', 'warehouse'],
      });
      return { success: true, data: { item: itemUpdated } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const item = await this.productHistoryRepository.update(
        { productHistoryId: id },
        { active: 0 },
      );
      if (!item.affected) throw new Error('Error deleting');
      return { success: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
