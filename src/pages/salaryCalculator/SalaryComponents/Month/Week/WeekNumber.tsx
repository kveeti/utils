
import { getWeek } from "date-fns";
import { useSalaryContext } from "../../../SalaryContext/SalaryContextProvider";
import { useSelectedDaysContext } from "../../../SelectedDays/SelectedDaysContext";

type Props = {
	week: Date;
};

export const WeekNumber = ({ week }: Props) => {
	const { getDaysWithDetailsOfWeek } = useSalaryContext();

	const { setDaysSelected, toggleDaysSelected } = useSelectedDaysContext();

	const weekNumber = getWeek(week, {
		weekStartsOn: 1,
		firstWeekContainsDate: 4,
	});

	const daysWithDetailsOfWeek = getDaysWithDetailsOfWeek(weekNumber);

	return (
		<div
			className="flex items-center justify-center rounded-md border-[1px] border-primary-700 bg-primary-800"
			onClick={(e) =>
				toggleDaysSelected(
					e.altKey
						? daysWithDetailsOfWeek
							.filter((day) => day.isWorkday)
							.map((d) => d.formattedDate)
						: daysWithDetailsOfWeek.map((d) => d.formattedDate)
				)
			}
			onMouseOverCapture={(e) => {
				if (e.shiftKey) {
					setDaysSelected(
						e.altKey
							? daysWithDetailsOfWeek
								.filter((d) => d.isWorkday)
								.map((d) => d.formattedDate)
							: daysWithDetailsOfWeek.map((d) => d.formattedDate),
						true
					);
				} else if (e.ctrlKey) {
					setDaysSelected(
						e.altKey
							? daysWithDetailsOfWeek
								.filter((d) => d.isWorkday)
								.map((d) => d.formattedDate)
							: daysWithDetailsOfWeek.map((d) => d.formattedDate),
						false
					);
				}
			}}
		>
			<div className="rounded-md px-1">{weekNumber}</div>
		</div>
	);
};
