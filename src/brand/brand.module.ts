import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from 'src/schemas/brand.schema';
import { HttpHeaderMiddleware } from 'src/http.header.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }])],
  controllers: [BrandController],
  providers: [BrandService, Logger]
})
export class BrandModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpHeaderMiddleware)
      .forRoutes(BrandController);
  }
}
