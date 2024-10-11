import type { ReactNode } from "react";

import { createCtx } from "../../../utils/createContext";
import { useDaysWithDetails } from "./useDaysWithDetails";
import { useHolidays } from "./useHolidays";
import { useMonthsWithDetails } from "./useMonthsWithDetails";
import { useSalaryForm } from "./useSalaryForm";
import {
	eachMonthOfInterval,
	endOfWeek,
	endOfYear,
	format,
	isValid,
	startOfWeek,
	startOfYear,
} from "date-fns";

const [useContextInner, Context] = createCtx<SalaryContextType>();

export const useSalaryContext = () => useContextInner();

type Props = {
	children: ReactNode;
};

export const SalaryContextProvider = ({ children }: Props) => {
	const value = useSalaryContextValue();

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

function useSalaryContextValue() {
	const form = useSalaryForm();

	const month = form.watch("month");
	const hoursPerDay = form.watch("hoursPerDay");
	const hourlyPay = form.watch("hourlyPay");
	const atWorkOnSaturdays = form.watch("atWorkOnSaturdays");
	const atWorkOnSundays = form.watch("atWorkOnSundays");
	const atWorkOnMidweekHolidays = form.watch("atWorkOnMidweekHolidays");

	const selectedMonthAsDate = isValid(new Date(month))
		? new Date(month)
		: new Date();

	const selectedMonthFormatted = format(selectedMonthAsDate, "MMMM");
	const selectedYearFormatted = format(selectedMonthAsDate, "yyyy");

	const holidays = useHolidays({ selectedMonthAsDate });

	const {
		getDayWithDetails,
		getDaysWithDetailsOfMonth,
		getDaysWithDetailsOfWeek,
		daysWithDetails,
	} = useDaysWithDetails({
		selectedMonth: selectedMonthAsDate,
		hoursPerDay,
		atWorkOnSaturdays,
		atWorkOnSundays,
		atWorkOnMidweekHolidays,
		holidays,
		hourlyPay,
	});

	const { getMonthWithDetails, monthsWithDetails } = useMonthsWithDetails({
		selectedMonth: selectedMonthAsDate,
		daysWithDetails,
		hourlyPay,
	});

	const selectedYearsWorkdays = [...daysWithDetails].filter(
		([_, day]) => day.isInSelectedYear && day.isWorkday,
	);

	const selectedMonthsWorkdays = [...daysWithDetails].filter(
		([_, day]) => day.isInSelectedMonth && day.isWorkday,
	);

	const selectedMonthsSalary = selectedMonthsWorkdays.reduce(
		(acc, [_, day]) => acc + day.salary,
		0,
	);

	const selectedYearsSalary = selectedYearsWorkdays.reduce(
		(acc, [_, day]) => acc + day.salary,
		0,
	);

	const selectedYearsTotalWorkhours = selectedYearsWorkdays.reduce(
		(acc, [_, day]) => acc + day.workhours,
		0,
	);

	const monthsWithDetailsArr = [...monthsWithDetails].map(
		([_, month]) => month,
	);

	const highestWorkdaysMonth = monthsWithDetailsArr.reduce((acc, month) => {
		if (!acc || month.workdays > acc?.workdays) {
			return month;
		}

		return acc;
	}, monthsWithDetailsArr[0]);

	const lowestWorkdaysMonth = monthsWithDetailsArr.reduce((acc, month) => {
		if (!acc || month.workdays < acc?.workdays) {
			return month;
		}

		return acc;
	}, monthsWithDetailsArr[0]);

	const months = eachMonthOfInterval({
		start: startOfWeek(startOfYear(selectedMonthAsDate)),
		end: endOfWeek(endOfYear(selectedMonthAsDate)),
	});

	return {
		form,
		months,

		holidays,

		daysWithDetails,
		monthsWithDetails,
		getDayWithDetails,
		getDaysWithDetailsOfMonth,
		getDaysWithDetailsOfWeek,
		getMonthWithDetails,

		selectedYearsWorkdays,
		selectedMonthsWorkdays,

		selectedYearsSalary,
		selectedMonthsSalary,

		selectedYearsTotalWorkhours,
		highestWorkdaysMonth: highestWorkdaysMonth ?? null,
		lowestWorkdaysMonth: lowestWorkdaysMonth ?? null,

		selectedMonthAsDate,
		selectedMonthFormatted,
		selectedYearFormatted,

		inputs: {
			month,
			hoursPerDay,
			hourlyPay,
			atWorkOnSundays,
			atWorkOnSaturdays,
		},
	};
}

export type SalaryContextType = ReturnType<typeof useSalaryContextValue>;
