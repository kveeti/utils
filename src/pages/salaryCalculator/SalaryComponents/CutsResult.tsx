import { formatNumber } from "../../../utils/formatNumber";
import { useSalaryContext } from "../SalaryContext/SalaryContextProvider";
import type { Cut } from "../salaryTypes";

export function CutsResult() {
	const { form, selectedMonthsSalary } = useSalaryContext();

	const cuts = form.watch("cuts");

	const calculatedCuts = cuts.reduce(
		(acc, cut, currI) => {
			const currentSalary =
				currI === 0 ? selectedMonthsSalary : acc[currI - 1].salaryLeft;

			const cutOfSalary =
				cut.type === "%"
					? currentSalary * ((cut.amount ?? 0) / 100)
					: (cut.amount ?? 0);
			const salaryLeft = currentSalary - cutOfSalary;

			acc.push({
				cutOfSalary,
				salaryLeft,
				cut,
			});

			return acc;
		},
		[] as { cutOfSalary: number; salaryLeft: number; cut: Cut }[],
	);

	return (
		<div className="rounded-md border-[1px] border-primary-700 bg-primary-800 p-3">
			<h2 className="pb-2 text-2xl font-medium">Cuts</h2>

			<div className="flex flex-col gap-2 text-lg">
				{calculatedCuts.map((cut, index) => (
					<div key={index} className="flex justify-between">
						<span>
							{formatNumber(
								cut.cut.amount,
								cut.cut.type === "€",
								cut.cut.type === "€",
							)}{" "}
							{cut.cut.type}
						</span>
						<span>{formatNumber(cut.salaryLeft)} €</span>
					</div>
				))}
			</div>
		</div>
	);
}
