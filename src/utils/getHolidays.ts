import Holidays from "date-holidays";

import type { Holiday } from "../pages/salaryCalculator/salaryTypes";

const hd = new Holidays("fi");

export const getHolidays = (year: Date): Holiday[] => {
	const holidays = hd.getHolidays(year);

	const mappedHolidays = [];

	for (let i = 0; i < holidays.length; i++) {
		const holiday = holidays[i];

		if (holiday.name === "Uudenvuodenpäivä") continue;

		mappedHolidays.push({
			date: new Date(holiday.date),
			name: holiday.name,
		});
	}

	return mappedHolidays;
};
