import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from 'src/schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  private readonly logger = new Logger(BrandService.name);

  constructor(@InjectModel(Brand.name) private brandModel: Model<BrandDocument>) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const createdBrand = new this.brandModel(createBrandDto)
    return createdBrand.save();
  }

  async findAll(): Promise<Brand[]>  {
    return this.brandModel.find().exec();;
  }

  async findOne(id: string): Promise<Brand> {
    return this.brandModel.findById(id).exec();
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    let existing = await this.brandModel.findOne({ "name": updateBrandDto.name, "_id" : { $ne: id}}).exec();
    this.logger.debug("existing :" + existing);
    if (existing === null) {
      return this.brandModel.findByIdAndUpdate(id, updateBrandDto, {new: true});
    } else {
      throw new HttpException("Brand with name " + updateBrandDto.name + " already exists", HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    return this.brandModel.findByIdAndDelete(id).exec();
  }
}
