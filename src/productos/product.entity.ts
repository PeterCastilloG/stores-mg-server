import { BrandEntity } from 'src/brand/brand.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { ProductHistoryEntity } from 'src/product-history/product-history.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ unique: true })
  name: string;

  @Column()
  medida: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column({ default: 1 })
  active: number;

  @Column()
  brandId: number;


  @Column()
  categoryId: number;

  @ManyToOne(() => BrandEntity, brand => brand.products)
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;

  @ManyToOne(() => CategoryEntity, category => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => ProductHistoryEntity, product => product.product)
  productHistory: ProductHistoryEntity[];
}
