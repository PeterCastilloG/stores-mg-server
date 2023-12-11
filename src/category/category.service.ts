import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateCategoryRequest } from './interfaces/create-category-request';
import { IUpdateCategoryRequest } from './interfaces/update-category-request';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CatergoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll() {
    try {
      const items = await this.categoryRepository.find({ where: { active: 1 } });
      return { success: true, data: { items: items } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: ICreateCategoryRequest) {
    try {
      const item = await this.categoryRepository.save(data);
      return { success: true, data: { item: item } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(data: IUpdateCategoryRequest) {
    try {
      const item = await this.categoryRepository.update(
        { categoryId: data.categoryId },
        data,
      );
      if (!item.affected) throw new Error('Error updating');
      const itemUpdated = await this.categoryRepository.findOneBy({
        categoryId: data.categoryId,
      });
      return { success: true, data: { item: itemUpdated } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const item = await this.categoryRepository.update(
        { categoryId: id },
        { active: 0 },
      );
      if (!item.affected) throw new Error('Error deleting');
      return { success: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
