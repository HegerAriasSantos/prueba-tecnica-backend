import Joi from "joi";
import { HolidayDto } from "./holiday.dto";

export interface CreateHolidayDto
	extends Omit<HolidayDto, "_id" | "createdAt" | "updatedAt"> {}

export const createHolidaySchema = Joi.object<CreateHolidayDto>({
	description: Joi.string().min(3).max(30).required(),
	date: Joi.date().required(),
	isRecurrent: Joi.boolean().required(),
});
