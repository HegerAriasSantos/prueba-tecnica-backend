import { Request, Response } from "express";
import { HolidayUseCase } from "../../application/use-cases/holiday.use-case";
import { MessagesUtils } from "../../shared/helpers/messages.utils";
import { ActionsErrorsEnums } from "../../shared/enums/actions.enum";

export class HolidayController {
	constructor(private readonly holidayUseCase: HolidayUseCase) {}

	async createAllRecurrentNews(): Promise<void> {
		await this.holidayUseCase.createAllRecurrentNews();
	}

	async create(req: Request, res: Response): Promise<void> {
		try {
			const holiday = await this.holidayUseCase.create(req.body);
			res.status(201).json(holiday);
		} catch (error) {
			res.status(500).json({
				error: MessagesUtils.createErrorMessage(
					"Holiday",
					ActionsErrorsEnums.CREATING,
				),
			});
		}
	}

	async getByDescription(req: Request, res: Response): Promise<void> {
		try {
			const { description } = req.params;
			const holiday = await this.holidayUseCase.getByDescription(description);
			if (!holiday) {
				res.status(404).json({
					error: MessagesUtils.createErrorMessage(
						"Holiday",
						ActionsErrorsEnums.NOT_FOUND,
					),
				});
				return;
			}
			res.json(holiday);
		} catch (error) {
			res.status(500).json({
				error: MessagesUtils.createErrorMessage(
					"Holiday",
					ActionsErrorsEnums.FETCHING,
				),
			});
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const holiday = await this.holidayUseCase.getById(req.params.id);
			if (!holiday) {
				res.status(404).json({
					error: MessagesUtils.createErrorMessage(
						"Holiday",
						ActionsErrorsEnums.NOT_FOUND,
					),
				});
				return;
			}
			res.json(holiday);
		} catch (error) {
			res.status(500).json({
				error: MessagesUtils.createErrorMessage(
					"Holiday",
					ActionsErrorsEnums.FETCHING,
				),
			});
		}
	}

	async getAll(res: Response): Promise<void> {
		try {
			const holidays = await this.holidayUseCase.getAll();
			res.json(holidays);
		} catch (error) {
			res.status(500).json({
				error: MessagesUtils.createErrorMessage(
					"Holiday",
					ActionsErrorsEnums.FETCHING,
				),
			});
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		try {
			const holiday = await this.holidayUseCase.update(req.params.id, req.body);
			if (!holiday) {
				res.status(404).json({
					error: MessagesUtils.createErrorMessage(
						"Holiday",
						ActionsErrorsEnums.NOT_FOUND,
					),
				});
				return;
			}
			res.json(holiday);
		} catch (error) {
			res.status(500).json({
				error: MessagesUtils.createErrorMessage(
					"Holiday",
					ActionsErrorsEnums.UPDATING,
				),
			});
		}
	}

	async remove(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			if (!id) {
				res.status(400).json({
					error: MessagesUtils.createErrorMessage(
						"Holiday",
						ActionsErrorsEnums.INVALID_ID,
					),
				});
				return;
			}
			const success = await this.holidayUseCase.remove(req.params.id);
			if (!success) {
				res.status(404).json({
					error: MessagesUtils.createErrorMessage(
						"Holiday",
						ActionsErrorsEnums.NOT_FOUND,
					),
				});
				return;
			}
			res.status(204).send();
		} catch (error) {
			res.status(500).json({
				error: MessagesUtils.createErrorMessage(
					"Holiday",
					ActionsErrorsEnums.DELETING,
				),
			});
		}
	}
}
