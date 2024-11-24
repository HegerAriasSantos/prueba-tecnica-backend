export class DateUtils {
	public static addYearToDate(
		dateString: string | Date,
		yearsToAdd: number,
	): Date {
		const date = new Date(dateString);

		if (isNaN(date.getTime())) {
			throw new Error("Invalid date format");
		}

		date.setFullYear(date.getFullYear() + yearsToAdd);

		return date;
	}
}
