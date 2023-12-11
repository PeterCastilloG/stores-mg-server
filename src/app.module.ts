import { Module } from '@nestjs/common';
import { SessionModule } from './session/session.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './session/session.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { StoreModule } from './stores/store.module';
import { StoreEntity } from './stores/store.entity';
import { WareHouseEntity } from './warehouse/warehouse.entity';
import { WareHouseModule } from './warehouse/warehouse.module';
import { CategoryEntity } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { BrandEntity } from './brand/brand.entity';
import { ProductModule } from './productos/product.module';
import { ProductEntity } from './productos/product.entity';
import { ProductHistoryEntity } from './product-history/product-history.entity';
import { ProductHistoryModule } from './product-history/product-history.module';
import { CustomerEntity } from './customer/customer.entity';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'root',
      database: 'stores',
      synchronize: true,
      entities: [
        SessionEntity,
        UserEntity,
        StoreEntity,
        WareHouseEntity,
        CategoryEntity,
        BrandEntity,
        ProductEntity,
        ProductHistoryEntity,
        CustomerEntity,
      ],
    }),
    SessionModule,
    UserModule,
    StoreModule,
    WareHouseModule,
    CategoryModule,
    BrandModule,
    ProductModule,
    ProductHistoryModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
