import { classNames } from "../../../../utils/classNames";
import { useSalaryContext } from "../../SalaryContext/SalaryContextProvider";
import { useSelectedDaysContext } from "../../SelectedDays/SelectedDaysContext";
import { MonthWithDetails } from "../../salaryTypes";

type Props = {
	monthWithDetails: MonthWithDetails;
};

export const Weekdays = ({ monthWithDetails }: Props) => {
	const { getDaysWithDetailsOfMonth } = useSalaryContext();

	const { toggleDaysSelected } = useSelectedDaysContext();

	return (
		<div className="grid grid-cols-8 gap-1 ">
			{["", "M", "T", "W", "T", "F", "S", "S"].map((weekDay, index) => (
				<span
					key={`${monthWithDetails.formattedDate}-${weekDay}-${index}`}
					className={classNames(
						"flex items-center justify-center rounded-md border-[1px] border-primary-700 bg-primary-800 p-2",
						index === 0 && "border-primary-600 bg-primary-700",
					)}
					onClick={(e) => {
						if (index !== 0) return;

						const daysWithDetailsOfMonth =
							getDaysWithDetailsOfMonth(
								monthWithDetails.formattedDate,
							);

						toggleDaysSelected(
							e.altKey
								? daysWithDetailsOfMonth
									.filter((day) => day.isWorkday)
									.map((d) => d.formattedDate)
								: daysWithDetailsOfMonth.map(
									(d) => d.formattedDate,
								),
						);
					}}
				>
					{weekDay}
				</span>
			))}
		</div>
	);
};
