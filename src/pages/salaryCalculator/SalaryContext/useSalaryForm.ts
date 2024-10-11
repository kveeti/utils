import { useFieldArray, useForm } from "react-hook-form";

import { type Cut, formatMonth } from "../salaryTypes";

export const useSalaryForm = () => {
	const form = useForm({
		defaultValues: {
			month: formatMonth(new Date()),
			hoursPerDay: 7.5,
			hourlyPay: 0,
			atWorkOnSaturdays: false,
			atWorkOnSundays: false,
			atWorkOnMidweekHolidays: false,
			cuts: [] as Cut[],
		},
	});

	const fieldArr = useFieldArray({
		name: "cuts",
		control: form.control,
	});

	return {
		...form,
		addCut: fieldArr.append,
		removeCut: fieldArr.remove,
		cuts: fieldArr.fields,
	};
};

export type SalaryFromType = ReturnType<typeof useSalaryForm>;
