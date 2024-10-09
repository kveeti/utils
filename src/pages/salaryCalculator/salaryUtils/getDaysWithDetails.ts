
import { eachDayOfInterval, endOfWeek, endOfYear, getWeek, isSameDay, isSameMonth, isSameYear, isSaturday, isSunday, isToday, isWeekend, startOfWeek, startOfYear } from "date-fns";
import { formatNumber } from "../../../utils/formatNumber";
import { DayWithDetails, Holiday, formatDay } from "../salaryTypes";

type Props = {
	selectedMonth: Date;
	holidays: Holiday[];
	atWorkOnSaturdays: boolean;
	atWorkOnSundays: boolean;
	atWorkOnMidweekHolidays: boolean;
	hoursPerDay: number;
	hourlyPay: number;
};

export const getDaysWithDetails = ({
	atWorkOnSaturdays,
	atWorkOnSundays,
	atWorkOnMidweekHolidays,
	holidays,
	hoursPerDay,
	selectedMonth,
	hourlyPay,
}: Props) => {
	const days = eachDayOfInterval({
		start: startOfWeek(startOfYear(selectedMonth), { weekStartsOn: 1 }),
		end: endOfWeek(endOfYear(selectedMonth), { weekStartsOn: 1 }),
	});

	return new Map([
		...(days.map((day) => {
			const holiday = holidays.find((holiday) => isSameDay(holiday.date, day));

			const isDayToday = isToday(day);
			const isDayWeekend = isWeekend(day);
			const isDayInSelectedYear = isSameYear(day, selectedMonth);
			const isDayInSelectedMonth = isSameMonth(day, selectedMonth);
			const isDayHoliday = !!holiday;

			const isDaySaturday = isDayWeekend && isSaturday(day);
			const isDaySunday = isDayWeekend && isSunday(day);

			const week = getWeek(day, { weekStartsOn: 1, firstWeekContainsDate: 4 });
			const workhours =
				!isDayInSelectedYear ||
					(isDaySaturday && !atWorkOnSaturdays) ||
					(isDaySunday && !atWorkOnSundays) ||
					(isDayHoliday && !isDayWeekend && !atWorkOnMidweekHolidays)
					? 0
					: hoursPerDay;

			const formattedWorkhours = formatNumber(workhours);
			const formatted = formatDay(day);

			const isWorkday = !!workhours;
			const salary = workhours * hourlyPay;

			return [
				formatted,
				{
					date: day,
					formattedDate: formatted,
					workhours,
					formattedWorkhours,
					salary,
					week,
					isWorkday,
					isToday: isDayToday,
					isWeekend: isDayWeekend,
					isHoliday: isDayHoliday,
					holidayName: holiday?.name,
					isInSelectedYear: isDayInSelectedYear,
					isInSelectedMonth: isDayInSelectedMonth,
				},
			];
		}) as [string, DayWithDetails][]),
	]);
};
