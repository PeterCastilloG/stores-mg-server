import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductHistoryEntity } from './product-history.entity';
import { ProductHistoryController } from './product-history.controller';
import { ProductHistoryService } from './product-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductHistoryEntity])],
  controllers: [ProductHistoryController],
  providers: [ProductHistoryService],
})
export class ProductHistoryModule {}
