import { CustomerEntity } from 'src/customer/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'stores' })
export class StoreEntity {
  @PrimaryGeneratedColumn()
  storeId: number;

  @Column({ unique: true })
  name: string;

  @Column()
  contact: string;

  @Column()
  description: string;

  @Column({ default: 1 })
  active: number;

  @OneToMany(() => CustomerEntity, customer => customer.store)
  customers: CustomerEntity[];
}
