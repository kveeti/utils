
import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { Day } from "./Day/Day";
import { WeekNumber } from "./WeekNumber";

type Props = {
	week: Date;
	month: Date;
};

export const Week = ({ week, month }: Props) => {
	const days = eachDayOfInterval({
		start: startOfWeek(week, { weekStartsOn: 1 }),
		end: endOfWeek(week, { weekStartsOn: 1 }),
	});

	return (
		<>
			<WeekNumber week={week} />

			{days.map((day) => (
				<Day key={day.toISOString()} day={day} month={month} />
			))}
		</>
	);
};
