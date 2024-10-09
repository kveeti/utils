
import { eachMonthOfInterval, endOfYear, isSameMonth, isSameYear, startOfYear } from "date-fns";
import { formatNumber } from "../../../utils/formatNumber";
import { DayWithDetails, MonthWithDetails, formatMonth } from "../salaryTypes";

type Props = {
	selectedMonth: Date;
	hourlyPay: number;
	daysWithDetails: Map<string, DayWithDetails>;
};

export const getMonthsWithDetails = ({ daysWithDetails, hourlyPay, selectedMonth }: Props) => {
	const months = eachMonthOfInterval({
		start: startOfYear(selectedMonth),
		end: endOfYear(selectedMonth),
	});

	return new Map([
		...(months.map((month) => {
			const monthsDaysWithDetails = [...daysWithDetails.values()].filter((day) =>
				isSameMonth(day.date, month)
			);

			const isMonthInSelectedYear = isSameYear(month, selectedMonth);
			const isMonthSelected = isSameMonth(month, selectedMonth);
			const workdays = monthsDaysWithDetails.filter((day) => day.isWorkday);
			const workhours = monthsDaysWithDetails.reduce((acc, day) => acc + day.workhours, 0);
			const formattedWorkhours = formatNumber(workhours);

			const salary = workhours * hourlyPay;
			const formatted = formatMonth(month);

			return [
				formatted,
				{
					date: month,
					formattedDate: formatted,
					isInSelectedYear: isMonthInSelectedYear,
					isSelected: isMonthSelected,
					workhours,
					formattedWorkhours,
					workdays: workdays.length,
					salary,
				},
			];
		}) as [string, MonthWithDetails][]),
	]);
};
