import { format, isSameMonth, isToday } from "date-fns";
import { classNames } from "../../../../../../utils/classNames";
import { useSalaryContext } from "../../../../SalaryContext/SalaryContextProvider";
import { useSelectedDaysContext } from "../../../../SelectedDays/SelectedDaysContext";
import { formatDay } from "../../../../salaryTypes";

type Props = {
	day: Date;
	month: Date;
};

export const Day = ({ day, month }: Props) => {
	const { getDayWithDetails } = useSalaryContext();

	const { isSelectedDay, setDaysSelected, toggleDaysSelected } = useSelectedDaysContext();

	const dayWithDetails = getDayWithDetails(formatDay(day));
	if (!dayWithDetails) return null;

	const isDimmed = !isSameMonth(day, month);
	const isSelected = isSelectedDay(dayWithDetails.formattedDate);
	const isHoliday = dayWithDetails.isHoliday;

	return (
		<div
			key={dayWithDetails.formattedDate}
			className={classNames(
				"flex items-center rounded-md border-[1px] border-primary-600 bg-primary-700 p-1 outline-none transition-all duration-150",
				isToday(day) && "rounded-md border-2 border-blue-500",
				isDimmed && "opacity-30",
				isSelected &&
				"border-transparent bg-transparent outline-none outline-1 outline-offset-0 outline-blue-500"
			)}
			onClick={() => toggleDaysSelected([dayWithDetails.formattedDate])}
			onMouseOverCapture={(e) => {
				if (e.shiftKey) {
					setDaysSelected([dayWithDetails.formattedDate], true);
				} else if (e.ctrlKey) {
					setDaysSelected([dayWithDetails.formattedDate], false);
				}
			}}
		>
			<div className="flex w-full flex-col gap-2">
				<time
					dateTime={dayWithDetails.formattedDate}
					className={classNames(
						(dayWithDetails?.isWeekend || isHoliday) && "text-red-500",
						"w-max rounded-md border-[1px] border-primary-500 bg-primary-600 px-1 text-sm sm:text-base"
					)}
				>
					{format(day, "dd")}
				</time>
				<span className="text-center text-sm">{dayWithDetails.formattedWorkhours}h</span>
			</div>
		</div>
	);
};
