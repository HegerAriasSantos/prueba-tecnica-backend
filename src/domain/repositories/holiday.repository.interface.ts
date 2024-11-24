import { Holiday } from "../../domain/entities/holiday.entity";
import { IBaseRepository } from "../../domain/repositories/base.repository.interface";

export interface IHolidayRepository extends IBaseRepository<Holiday> {
	findByDescription(description: string): Promise<Holiday | null>;
	findAllRecurrent(): Promise<Holiday[]>;
}
