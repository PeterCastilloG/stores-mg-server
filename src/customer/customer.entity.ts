import { StoreEntity } from 'src/stores/store.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  customerId: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  storeId: number;

  @Column({ default: 1 })
  active: number;

  @ManyToOne(() => StoreEntity, (store) => store.customers)
  @JoinColumn({ name: 'storeId' })
  store: StoreEntity;
}
