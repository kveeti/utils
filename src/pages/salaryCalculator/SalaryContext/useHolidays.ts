import { getHolidays } from "../../../utils/getHolidays";

type Props = {
	selectedMonthAsDate: Date;
};

export const useHolidays = ({ selectedMonthAsDate }: Props) =>
	getHolidays(selectedMonthAsDate);
