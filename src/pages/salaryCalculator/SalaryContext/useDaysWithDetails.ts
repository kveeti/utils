import type { Holiday } from "../salaryTypes";
import { getDaysWithDetails } from "../salaryUtils/getDaysWithDetails";

type Props = {
	selectedMonth: Date;
	holidays: Holiday[];
	atWorkOnSaturdays: boolean;
	atWorkOnSundays: boolean;
	atWorkOnMidweekHolidays: boolean;
	hoursPerDay: number;
	hourlyPay: number;
};

export const useDaysWithDetails = ({
	atWorkOnSaturdays,
	atWorkOnSundays,
	atWorkOnMidweekHolidays,
	holidays,
	hoursPerDay,
	selectedMonth,
	hourlyPay,
}: Props) => {
	const daysWithDetails = getDaysWithDetails({
		atWorkOnSaturdays,
		atWorkOnSundays,
		atWorkOnMidweekHolidays,
		holidays,
		hoursPerDay,
		selectedMonth,
		hourlyPay,
	});

	const getDayWithDetails = (formattedDay: string) =>
		daysWithDetails.get(formattedDay);

	const getDaysWithDetailsOfMonth = (formattedMonth: string) => {
		return [...daysWithDetails.values()].filter((dayWithDetails) =>
			dayWithDetails.formattedDate.startsWith(formattedMonth),
		);
	};

	const getDaysWithDetailsOfWeek = (week: number) => {
		return [...daysWithDetails.values()].filter(
			(dayWithDetails) => dayWithDetails.week === week,
		);
	};

	return {
		daysWithDetails,
		getDaysWithDetailsOfMonth,
		getDaysWithDetailsOfWeek,
		getDayWithDetails,
	};
};
