import { ProductHistoryEntity } from 'src/product-history/product-history.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'warehouses' })
export class WareHouseEntity {
  @PrimaryGeneratedColumn()
  warehouseId: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ default: 1 })
  active: number;

  @OneToMany(() => ProductHistoryEntity, product => product.warehouse)
  productHistory: ProductHistoryEntity[];
}
