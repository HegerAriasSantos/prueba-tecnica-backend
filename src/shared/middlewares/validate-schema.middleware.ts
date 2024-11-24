import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateSchema = (
	joiSchema: ObjectSchema,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { error } = joiSchema.validate(req.body);

	if (error) {
		res.status(400).json({
			status: "error",
			message: error.details.map(detail => detail.message),
		});
		return;
	}

	next();
};
