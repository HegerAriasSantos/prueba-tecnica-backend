import { ObjectId } from "mongodb";

export interface Holiday {
	_id?: ObjectId | string;
	description: string;
	date: Date;
	isRecurrent: boolean;
	createdAt: Date;
	updatedAt: Date;
}
