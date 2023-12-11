import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WareHouseEntity } from './warehouse.entity';
import { WareHouseService } from './warehouse.service';
import { WareHouseController } from './warehouse.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WareHouseEntity])],
  controllers: [WareHouseController],
  providers: [WareHouseService],
})
export class WareHouseModule {}
