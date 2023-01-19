import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, NotFoundException } from '@nestjs/common';
import { RequestId } from 'src/requestId.token.decorator';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  private readonly logger = new Logger(BrandController.name);

  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@RequestId() requestId: String, @Body() createBrandDto: CreateBrandDto) {
    this.logger.log({"message":"Create brand initiated for " + createBrandDto, "requestId": requestId});
    return this.brandService.create(createBrandDto);
  }

  @Get()
  findAll(@RequestId() requestId: String) {
    this.logger.log({"message":"FindAll brand initiated", "requestId": requestId});
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@RequestId() requestId: String, @Param('id') id: string) {
    this.logger.log({"message":"FindOne brand initiated for id :"+ id, "requestId": requestId});
    let b = this.brandService.findOne(id);
    if (b === undefined) {
      throw new NotFoundException("Failed to locate brand");
    }
    return b;
  }

  @Patch(':id')
  update(@RequestId() requestId: String, @Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    this.logger.log({"message":"Update brand initiated for id :"+ id + " data: " + updateBrandDto, "requestId": requestId});
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@RequestId() requestId: String, @Param('id') id: string) {
    this.logger.log({"message":"Remove brand initiated for id :"+ id, "requestId": requestId});
    return this.brandService.remove(id);
  }
}
