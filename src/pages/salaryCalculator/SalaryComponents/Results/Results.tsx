
import { format } from "date-fns";
import { formatCurrency, formatNumber } from "../../../../utils/formatNumber";
import { useSalaryContext } from "../../SalaryContext/SalaryContextProvider";

export const Results = () => {
	const {
		selectedYearFormatted,
		selectedMonthFormatted,
		selectedMonthsSalary,
		selectedYearsSalary,
		selectedYearsTotalWorkhours,
		selectedYearsWorkdays,
		lowestWorkdaysMonth,
		highestWorkdaysMonth,
	} = useSalaryContext();

	return (
		<div className="rounded-md border-[1px] border-primary-700 bg-primary-800 p-3">
			<h2 className="pb-2 text-2xl font-medium">Results</h2>

			<div className="flex flex-col gap-2 text-lg">
				<div>
					<div className="flex justify-between">
						<h2>Salary in {selectedMonthFormatted}</h2>
						<span>{formatCurrency(selectedMonthsSalary)}</span>
					</div>
					<div className="flex justify-between">
						<h2>Salary in {selectedYearFormatted}</h2>
						<span>{formatCurrency(selectedYearsSalary)}</span>
					</div>
				</div>

				<div>
					<div className="flex justify-between">
						<h2>Total work hours in {selectedYearFormatted}</h2>
						<span>{formatNumber(selectedYearsTotalWorkhours)} h</span>
					</div>
					<div className="flex justify-between">
						<h2>Total work days in {selectedYearFormatted}</h2>
						<span>{formatNumber(selectedYearsWorkdays.length)} d</span>
					</div>
				</div>

				<div>
					{lowestWorkdaysMonth && (
						<div className="flex justify-between">
							<h2>Lowest month</h2>
							<span className="text-yellow-500">
								{format(lowestWorkdaysMonth.date, "MMMM")}
							</span>
						</div>
					)}
					{highestWorkdaysMonth && (
						<div className="flex justify-between">
							<h2>Highest month</h2>
							<span className="text-green-500">
								{format(highestWorkdaysMonth.date, "MMMM")}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
