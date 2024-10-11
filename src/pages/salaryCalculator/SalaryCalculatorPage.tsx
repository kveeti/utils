import { Title } from "../../Ui/Title";
import { CutsResult } from "./SalaryComponents/CutsResult";
import { Form } from "./SalaryComponents/Form/Form";
import { Month } from "./SalaryComponents/Month/Month";
import { Results } from "./SalaryComponents/Results/Results";
import { SelectedDays } from "./SalaryComponents/SelectedDays/SelectedDays";
import {
	SalaryContextProvider,
	useSalaryContext,
} from "./SalaryContext/SalaryContextProvider";
import { SelectedDaysContextProvider } from "./SelectedDays/SelectedDaysContext";

function SalaryCalculatorPageInner() {
	const { months } = useSalaryContext();

	return (
		<main className="mx-auto flex w-full max-w-[1300px] flex-col justify-center gap-3 p-3 pt-[5vh] bp-1:flex-row">
			<div className="mx-auto flex h-max w-full max-w-[400px] flex-col gap-3 overflow-auto md:sticky md:top-3">
				<Title>💰</Title>

				<div className="max-h-screen overflow-auto">
					<div className="flex flex-col gap-3">
						<Form />

						<Results />

						<SelectedDays />

						<CutsResult />
					</div>
				</div>
			</div>

			<div className="mx-auto w-full max-w-[400px] border-[1px] border-primary-700 sm:w-[1px]"></div>

			<div className="mx-auto grid w-full max-w-[400px] grid-cols-1 gap-3 bp-1:max-w-[unset] bp-2:grid-cols-2">
				{months.map((month) => (
					<Month key={month.toISOString()} month={month} />
				))}
			</div>
		</main>
	);
}

export function SalaryCalculatorPage() {
	return (
		<SalaryContextProvider>
			<SelectedDaysContextProvider>
				<SalaryCalculatorPageInner />
			</SelectedDaysContextProvider>
		</SalaryContextProvider>
	);
}
