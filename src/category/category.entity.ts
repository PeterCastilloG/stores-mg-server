import { ProductEntity } from 'src/productos/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ default: 1 })
  active: number;

  @OneToMany(() => ProductEntity, product => product.category)
  products: ProductEntity[];
}
