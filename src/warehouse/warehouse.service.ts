import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateWareHouseRequest } from './interfaces/create-warehouse-request';
import { IUpdateWareHouseRequest } from './interfaces/update-warehouse-request';
import { WareHouseEntity } from './warehouse.entity';

@Injectable()
export class WareHouseService {
  constructor(
    @InjectRepository(WareHouseEntity)
    private readonly warehouseRepository: Repository<WareHouseEntity>,
  ) {}

  async findAll() {
    try {
      const items = await this.warehouseRepository.find({ where: { active: 1 } });
      return { success: true, data: { items: items } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: ICreateWareHouseRequest) {
    try {
      const item = await this.warehouseRepository.save(data);
      return { success: true, data: { item: item } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(data: IUpdateWareHouseRequest) {
    try {
      const item = await this.warehouseRepository.update(
        { warehouseId: data.warehouseId },
        data,
      );
      if (!item.affected) throw new Error('Error updating');
      const itemUpdated = await this.warehouseRepository.findOneBy({
        warehouseId: data.warehouseId,
      });
      return { success: true, data: { item: itemUpdated } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const item = await this.warehouseRepository.update(
        { warehouseId: id },
        { active: 0 },
      );
      if (!item.affected) throw new Error('Error deleting');
      return { success: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
