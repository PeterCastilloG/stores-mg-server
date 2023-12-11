import { ProductEntity } from 'src/productos/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'brands' })
export class BrandEntity {
  @PrimaryGeneratedColumn()
  brandId: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  contact: string;

  @Column({ default: 1 })
  active: number;

  @OneToMany(() => ProductEntity, product => product.brand)
  products: ProductEntity[];
}
