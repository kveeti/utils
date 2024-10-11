import type {
	DayWithDetails,
	DaysWithDetails,
	DaysWithDetailsArray,
	Holiday,
	MonthWithDetails,
	MonthsWithDetails,
} from "../salaryTypes";
import type { SalaryFromType } from "./useSalaryForm";

export type SalaryContextType = {
	form: SalaryFromType;
	months: Date[];

	holidays: Holiday[];

	toggleDaysSelected: (formattedDays: string[]) => void;
	toggleDaysWithDetailsSelected: (daysWithDetails: DayWithDetails[]) => void;
	isDaySelected: (formattedDay: string) => boolean;
	setDaysSelected: (formattedDays: string[], value: boolean) => void;
	setDaysWithDetailsSelected: (
		daysWithDetails: DayWithDetails[],
		value: boolean,
	) => void;

	selectedDays: Map<string, DayWithDetails>;

	daysWithDetails: DaysWithDetails;
	monthsWithDetails: MonthsWithDetails;
	getDayWithDetails: (formattedDay: string) => DayWithDetails | undefined;
	getDaysWithDetailsOfMonth: (formattedMonth: string) => DayWithDetails[];
	getDaysWithDetailsOfWeek: (week: number) => DayWithDetails[];
	getMonthWithDetails: (
		formattedMonth: string,
	) => MonthWithDetails | undefined;

	inputs: {
		month: string;
		hoursPerDay: number;
		hourlyPay: number;
		atWorkOnSaturdays: boolean;
		atWorkOnSundays: boolean;
	};

	selectedMonthsSalary: number;
	selectedYearsSalary: number;
	selectedMonthsWorkdays: DaysWithDetailsArray;
	selectedYearsWorkdays: DaysWithDetailsArray;
	selectedYearsTotalWorkhours: number;
	highestWorkdaysMonth: MonthWithDetails | null;
	lowestWorkdaysMonth: MonthWithDetails | null;

	selectedMonthAsDate: Date;
	selectedYearFormatted: string;
	selectedMonthFormatted: string;
};
