import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewDocument, ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewDocument>,
	) {}
	async create(dto: CreateReviewDto): Promise<ReviewDocument> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<ReviewDocument | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<ReviewDocument[]> {
		return this.reviewModel.find({ productId }).exec();
	}

	async deleteByProductId(productId: string): Promise<DeleteResult> {
		return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
	}
}
