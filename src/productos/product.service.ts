import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ICreateProductRequest } from './interfaces/create-product-request';
import { IUpdateProductRequest } from './interfaces/update-product-request';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll() {
    try {
      const items = await this.productRepository.find({
        where: { active: 1 },
        relations: [
          'brand',
          'category',
          'productHistory',
          'productHistory.warehouse',
        ],
      });
      items.forEach((item) => {
        item.productHistory = item.productHistory.filter((item) => item.active);
      });
      return { success: true, data: { items: items } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: number) {
    try {
      const item = await this.productRepository.findOne({
        where: { active: 1, productId: id },
        relations: [
          'brand',
          'category',
          'productHistory',
          'productHistory.warehouse',
        ],
      });
      item.productHistory = item.productHistory.filter((item) => item.active);
      return { success: true, data: { item: item } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: ICreateProductRequest) {
    try {
      const item = await this.productRepository.save(data);
      const itemCreated = await this.productRepository.findOne({
        where: { productId: item.productId },
        relations: ['brand', 'category'],
      });
      return { success: true, data: { item: itemCreated } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(data: IUpdateProductRequest) {
    try {
      const item = await this.productRepository.update(
        { productId: data.productId },
        data,
      );
      if (!item.affected) throw new Error('Error updating');
      const itemUpdated = await this.productRepository.findOne({
        where: { productId: data.productId },
        relations: ['brand', 'category'],
      });
      return { success: true, data: { item: itemUpdated } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const item = await this.productRepository.update(
        { productId: id },
        { active: 0 },
      );
      if (!item.affected) throw new Error('Error deleting');
      return { success: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
