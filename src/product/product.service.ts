import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewModel } from 'src/review/review.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductDocument, ProductModel } from './product.model';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel.name) private readonly productModel: Model<ProductDocument>,
	) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findWithReviews(dto: FindProductDto): Promise<
		(ProductModel & {
			review: ReviewModel[];
			reviewCount: number;
			reviewAvg: number;
		})[]
	> {
		return this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					$sort: {
						_id: 1, // prior to limit usage use $sort, cause elements could have wrong order every request
					},
				},
				{
					$limit: dto.limit,
				},
				{
					$lookup: {
						from: 'reviewmodels',
						localField: '_id',
						foreignField: 'productId',
						as: 'review',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$review' },
						reviewAvg: { $avg: '$review.rating' },
					},
				},
			])
			.exec();
	}
}
