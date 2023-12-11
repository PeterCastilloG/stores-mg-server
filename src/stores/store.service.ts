import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreEntity } from './store.entity';
import { ICreateStoreRequest } from './interfaces/create-store-request';
import { IUpdateStoreRequest } from './interfaces/update-store-request';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
  ) {}

  async findAll() {
    try {
      const items = await this.storeRepository.find({ where: { active: 1 } });
      return { success: true, data: { items: items } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: ICreateStoreRequest) {
    try {
      const item = await this.storeRepository.save(data);
      return { success: true, data: { item: item } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(data: IUpdateStoreRequest) {
    try {
      const item = await this.storeRepository.update(
        { storeId: data.storeId },
        data,
      );
      if (!item.affected) throw new Error('Error updating');
      const itemUpdated = await this.storeRepository.findOneBy({
        storeId: data.storeId,
      });
      return { success: true, data: { item: itemUpdated } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const item = await this.storeRepository.update(
        { storeId: id },
        { active: 0 },
      );
      if (!item.affected) throw new Error('Error deleting');
      return { success: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
