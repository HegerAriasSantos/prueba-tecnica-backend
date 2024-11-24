import { Holiday } from "../../domain/entities/holiday.entity";
import { IHolidayRepository } from "../../domain/repositories/holiday.repository.interface";
import { CreateHolidayDto } from "../../application/dtos/holidays/create-holiday.dto";
import { HolidayMapper } from "../../application/mapper/holidays.mapper";
import { HolidayDto } from "../../application/dtos/holidays/holiday.dto";
import { UpdateHolidayDto } from "../../application/dtos/holidays/update-holiday.dto";
import { DateUtils } from "../../shared/helpers/date.utils";

export class HolidayUseCase {
	constructor(private readonly holidayRepository: IHolidayRepository) {}

	async createAllRecurrentNews(): Promise<void> {
		try {
			const holidaysRecurrent = await this.holidayRepository.findAllRecurrent();
			await Promise.all(
				holidaysRecurrent.map(async holiday => {
					console.log({ id: holiday._id });
					const newEntity = { ...holiday };
					newEntity._id = undefined;
					newEntity.date = DateUtils.addYearToDate(holiday.date, 1);

					return this.holidayRepository.create(newEntity);
				}),
			);
		} catch (error) {}
	}
	async create(dto: CreateHolidayDto): Promise<Holiday> {
		const entity = HolidayMapper.toEntity(dto);
		return this.holidayRepository.create(entity);
	}

	async getById(id: string): Promise<HolidayDto> {
		const entity = await this.holidayRepository.findById(id);
		if (!entity) {
			throw new Error(`Holiday with id ${id} not found`);
		}
		return HolidayMapper.toDTO(entity);
	}

	async getByDescription(description: string): Promise<HolidayDto> {
		const entity = await this.holidayRepository.findByDescription(description);
		if (!entity) {
			throw new Error(`Holiday with description ${description} not found`);
		}
		return HolidayMapper.toDTO(entity);
	}

	async getAll(): Promise<HolidayDto[]> {
		const results = await this.holidayRepository.findAll();
		return results.map(HolidayMapper.toDTO);
	}

	async update(id: string, entity: UpdateHolidayDto): Promise<HolidayDto> {
		const updatedData = {
			...entity,
			updatedAt: new Date(),
		};

		const result = await this.holidayRepository.update(id, updatedData);
		if (!result) {
			throw new Error(`Holiday with id ${id} not found`);
		}
		return HolidayMapper.toDTO(result);
	}

	async remove(id: string): Promise<boolean> {
		return this.holidayRepository.delete(id);
	}
}
