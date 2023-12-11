import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateBrandRequest } from './interfaces/create-brand-request';
import { IUpdateBrandRequest } from './interfaces/update-brand-request';
import { BrandEntity } from './brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async findAll() {
    try {
      const items = await this.brandRepository.find({ where: { active: 1 } });
      return { success: true, data: { items: items } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: ICreateBrandRequest) {
    try {
      const item = await this.brandRepository.save(data);
      return { success: true, data: { item: item } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(data: IUpdateBrandRequest) {
    try {
      const item = await this.brandRepository.update(
        { brandId: data.brandId },
        data,
      );
      if (!item.affected) throw new Error('Error updating');
      const itemUpdated = await this.brandRepository.findOneBy({
        brandId: data.brandId,
      });
      return { success: true, data: { item: itemUpdated } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const item = await this.brandRepository.update(
        { brandId: id },
        { active: 0 },
      );
      if (!item.affected) throw new Error('Error deleting');
      return { success: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
