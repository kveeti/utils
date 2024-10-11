import { type ReactNode, useState } from "react";

import { createCtx } from "../../../utils/createContext";

const [useContextInner, Context] = createCtx<SelectedDaysContextType>();

export function useSelectedDaysContext() {
	return useContextInner();
}

export function SelectedDaysContextProvider(props: { children: ReactNode }) {
	const value = useSelectedDaysContextValue();

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

function useSelectedDaysContextValue() {
	const [selectedDays, setSelectedDays] = useState<string[]>([]);

	function isSelectedDay(day: string) {
		return selectedDays.includes(day);
	}

	// if day is already selected, deselect it
	// if day is not selected, select it
	function toggleDaysSelected(days: string[]) {
		const daysToToggle = days.filter((day) => selectedDays.includes(day));
		if (daysToToggle.length > 0) {
			setSelectedDays(
				selectedDays.filter((day) => !daysToToggle.includes(day)),
			);
		} else {
			setSelectedDays([...selectedDays, ...days]);
		}
	}

	function setDaysSelected(days: string[], selected: boolean) {
		if (selected) {
			const daysToSelect = days.filter(
				(day) => !selectedDays.includes(day),
			);

			setSelectedDays([...selectedDays, ...daysToSelect]);
		} else {
			setSelectedDays(selectedDays.filter((day) => !days.includes(day)));
		}
	}

	return {
		selectedDays,
		isSelectedDay,
		setDaysSelected,
		toggleDaysSelected,
	};
}

type SelectedDaysContextType = ReturnType<typeof useSelectedDaysContextValue>;
