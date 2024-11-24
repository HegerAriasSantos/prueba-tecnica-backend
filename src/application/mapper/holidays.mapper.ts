import { CreateHolidayDto } from "../../application/dtos/holidays/create-holiday.dto";
import { HolidayDto } from "../../application/dtos/holidays/holiday.dto";
import { Holiday } from "../../domain/entities/holiday.entity";
import { ObjectId } from "mongodb";

export class HolidayMapper {
	public static toDTO(entity: Holiday): HolidayDto {
		const holidayDTO = new HolidayDto();
		holidayDTO.id = entity._id?.toString() || "";
		holidayDTO.description = entity.description;
		holidayDTO.isRecurrent = entity.isRecurrent;
		holidayDTO.date = new Date(entity.date);
		holidayDTO.updatedAt = entity.updatedAt;
		holidayDTO.createdAt = entity.createdAt;
		return holidayDTO;
	}

	public static fromDTO(dto: HolidayDto): Holiday {
		const entity: Holiday = {
			_id: new ObjectId(dto.id),
			description: dto.description,
			date: new Date(dto.date),
			isRecurrent: dto.isRecurrent,
			createdAt: dto.createdAt,
			updatedAt: dto.updatedAt,
		};
		return entity;
	}
	public static toEntity(dto: CreateHolidayDto): Holiday {
		return {
			description: dto.description,
			date: new Date(dto.date),
			isRecurrent: dto.isRecurrent,
			createdAt: new Date(),
			updatedAt: new Date(),
		} as Holiday;
	}
}
