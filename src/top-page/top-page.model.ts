import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class TopPageAdvantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}
export class HhData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

@Schema({ timestamps: true })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop()
	title: string;

	@Prop()
	category: string;

	@Prop()
	hh?: HhData;

	@Prop([TopPageAdvantage])
	advantages: TopPageAdvantage[];

	@Prop()
	seoText: string;

	@Prop([String])
	tags: string[];

	@Prop()
	tagsTitle: string;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
