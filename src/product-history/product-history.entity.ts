import { ProductEntity } from 'src/productos/product.entity';
import { WareHouseEntity } from 'src/warehouse/warehouse.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'producthistorys' })
export class ProductHistoryEntity {
  @PrimaryGeneratedColumn()
  productHistoryId: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  used: number;

  @Column()
  expiryDate: string;

  @Column()
  warehouseId: number;

  @Column()
  productId: number;

  @Column({ default: 1 })
  active: number;

  @ManyToOne(() => ProductEntity, (product) => product.productHistory)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ManyToOne(() => WareHouseEntity, (warehouse) => warehouse.productHistory)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: WareHouseEntity;
}
