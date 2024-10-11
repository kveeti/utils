import {
	eachDayOfInterval,
	eachYearOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	getDay,
	isToday,
	isWeekend,
	startOfMonth,
	startOfWeek,
} from "date-fns";
import { Input } from "../../Ui/Input";
import { useSetTitle } from "../../utils/useSetTitle";

import { useFieldArray, useForm } from "react-hook-form";
import { classNames } from "../../utils/classNames";
import Holidays from "date-holidays";

const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

type PreferredSpan = {
	start: string;
	end: string;
	holidaysToUse: number;
};

export function HolidayCalculator() {
	useSetTitle("Calculators | Holidays");

	const form = useForm({
		defaultValues: {
			saturdaysUseHolidays: true,
			preferredSpans: [
				{
					start: new Date().toISOString().slice(0, 10),
					end: getNextHolidayYear().toISOString().slice(0, 10),
					holidaysToUse: 3,
				},
			] as PreferredSpan[],
		},
	});

	const fieldArr = useFieldArray({
		name: "preferredSpans",
		control: form.control,
	});

	const preferredSpans = form.watch("preferredSpans");

	const from = preferredSpans.at(0)?.start;
	const to = preferredSpans.at(-1)?.end;

	return (
		<main className="mx-auto flex w-full max-w-[1300px] flex-col justify-center gap-3 p-3 pt-[5vh] bp-1:flex-row">
			<fieldset className="space-y-4">
				<label className="flex items-center space-x-2">
					<input
						type="checkbox"
						{...form.register("saturdaysUseHolidays")}
						className="h-[20px] w-[20px]"
					/>
					<span className="block">saturdays use holidays</span>
				</label>

				{fieldArr.fields.map((field, i) => (
					<fieldset key={field.id} className="space-y-4">
						<div className="flex space-x-2">
							<Input
								label="Start"
								type="date"
								{...form.register(`preferredSpans.${i}.start`, {
									valueAsDate: true,
								})}
							/>
							<Input
								label="End"
								type="date"
								{...form.register(`preferredSpans.${i}.end`)}
							/>
							<Input
								label="Holidays"
								type="number"
								{...form.register(
									`preferredSpans.${i}.holidaysToUse`,
								)}
							/>
						</div>
						<button
							type="button"
							onClick={() => fieldArr.remove(i)}
						>
							Remove
						</button>
					</fieldset>
				))}

				<button
					type="button"
					onClick={() =>
						fieldArr.append({
							start: "2025-01-01",
							end: "2025-02-01",
							holidaysToUse: 5,
						})
					}
				>
					Add span
				</button>
			</fieldset>

			<div className="relative w-full h-full">
				<Cal
					from={from}
					to={to}
					preferredSpans={form.watch("preferredSpans")}
					saturdaysUseHolidays={form.watch("saturdaysUseHolidays")}
				/>
			</div>
		</main>
	);
}

function Cal({
	from,
	to,
	preferredSpans,
	saturdaysUseHolidays,
}: {
	from?: string;
	to?: string;
	preferredSpans?: PreferredSpan[];
	saturdaysUseHolidays: boolean;
}) {
	if (!from || !to) {
		return null;
	}

	const fromDate = new Date(from);
	const toDate = new Date(to);

	const holidays = getHolidays(fromDate, toDate);

	const spans = preferredSpans?.map((span) => {
		const start = new Date(span.start);
		const end = new Date(span.end);

		return findTopHolidaySpans({
			days: eachDayOfInterval({ start, end }).map((day) => {
				const isHoliday = !!holidays.get(format(day, "yyyy-MM-dd"));
				const dayOfWeekI = getDay(day);
				// biome-ignore lint/style/noNonNullAssertion: getDay returns 0-6
				const dayOfWeek = weekdays[dayOfWeekI]!;

				return {
					date: day,
					dayOfWeek,
					isHoliday,
				};
			}),
			holidaysLeft: span.holidaysToUse,
			saturdaysUseHolidays,
		}).slice(0, 6);
	});

	const days = eachDayOfInterval({
		start: startOfWeek(startOfMonth(fromDate), { weekStartsOn: 1 }),
		end: endOfWeek(endOfMonth(toDate), { weekStartsOn: 1 }),
	});

	let isZebra = true;

	return (
		<div className="grid grid-cols-7 gap-[0.0625rem] p-[0.0625rem] bg-gray-700 absolute">
			{days.map((day) => {
				const isFirstOfMonth = day.getDate() === 1;
				if (isFirstOfMonth) {
					isZebra = !isZebra;
				}

				return (
					<div
						key={day.toISOString()}
						className={classNames(
							isToday(day) && "bg-blue-500",
							isWeekend(day) && isZebra
								? "bg-gray-800/70"
								: isZebra
									? "bg-gray-900/70"
									: isWeekend(day)
										? "bg-gray-800"
										: "bg-gray-900",
							"flex flex-col p-2 min-w-[6rem] min-h-[4rem]",
						)}
					>
						<div
							className={classNames(
								"text-right leading-none",
								isFirstOfMonth && "font-medium text-lg",
								holidays.get(format(day, "yyyy-MM-dd")) &&
								"text-red-500",
							)}
						>
							{isFirstOfMonth && format(day, "MMM")}{" "}
							{format(day, "d")}
						</div>
					</div>
				);
			})}

			{spans?.map((p, spanI) =>
				p.map((span) => {
					const start = days.findIndex(
						(day) => day.getTime() === span.start.getTime(),
					);
					const end = days.findIndex(
						(day) => day.getTime() === span.end.getTime(),
					);

					const normalizedWeekday = (day: Date) => {
						const dayOfWeek = getDay(day);
						return dayOfWeek === 0 ? 7 : dayOfWeek;
					};

					let length = end - start + 1;
					// biome-ignore lint/style/noNonNullAssertion: safe
					let startColumn = normalizedWeekday(days[start]!);
					let startRow = Math.ceil(start / 7);

					const spanElements = [];

					while (length > 0) {
						const daysLeftInWeek = 7 - startColumn + 1;
						const daysInThisRow = Math.min(length, daysLeftInWeek);

						const spanGridRow = {
							gridRowStart: startRow,
							gridColumnStart: startColumn,
							gridColumnEnd: `span ${daysInThisRow}`,
						};

						spanElements.push(
							<div
								className="absolute w-full mt-[2rem]"
								style={{
									top: 0,
									left: 0,
									backgroundColor: getColor(spanI),
									...spanGridRow,
								}}
							>
								{span.holidaysUsed} {span.daysOff}
							</div>,
						);

						length -= daysInThisRow;
						startRow++;
						startColumn = 0;
					}

					return spanElements;
				}),
			)}
		</div>
	);
}

interface DayInfo {
	date: Date;
	dayOfWeek: string;
	isHoliday: boolean;
}

interface HolidaySpan {
	holidaysUsed: number;
	daysOff: number;
	fStart: string;
	fEnd: string;
	start: Date;
	end: Date;
}

const findTopHolidaySpans = ({
	days,
	holidaysLeft,
	saturdaysUseHolidays,
}: {
	days: DayInfo[];
	holidaysLeft: number;
	saturdaysUseHolidays: boolean;
}) => {
	const possibleSpans: HolidaySpan[] = [];

	for (let i = 0; i < days.length; i++) {
		const span: DayInfo[] = [];
		let holidaysUsed = 0;

		if (days.length - i < holidaysLeft) {
			continue;
		}

		for (let j = i; j < days.length && holidaysUsed <= holidaysLeft; j++) {
			const day = days[j];
			const isSaturday = day.dayOfWeek === "sat";
			const isSunday = day.dayOfWeek === "sun";

			if (day.isHoliday || isSunday) {
				// add holidays and sundays without using holiday count
				span.push(day);
			} else if (isSaturday) {
				if (saturdaysUseHolidays) {
					// saturdays only use holidays if the entire Mon-Fri block is taken
					const priorWorkdays = days
						.slice(j - 5, j)
						.filter(
							(d) =>
								d.dayOfWeek !== "sat" &&
								d.dayOfWeek !== "sun" &&
								!d.isHoliday,
						);
					const priorHolidaysUsed = priorWorkdays.reduce(
						(count, d) => {
							return (
								count +
								(d.isHoliday
									? 1
									: holidaysUsed < holidaysLeft &&
										!d.isHoliday
										? 1
										: 0)
							);
						},
						0,
					);

					if (priorHolidaysUsed === 5) {
						holidaysUsed++; // use a holiday for Saturday
					}
				}

				span.push(day);
			} else if (holidaysUsed < holidaysLeft) {
				// for weekdays (mon-fri) that aren't public holidays, use holidays
				span.push(day);
				holidaysUsed++;
			} else {
				break;
			}
		}

		if (!span.length) {
			continue;
		}

		possibleSpans.push({
			daysOff: span.length,
			fStart: format(span[0].date, "yyyy-MM-dd"),
			fEnd: format(span[span.length - 1].date, "yyyy-MM-dd"),
			holidaysUsed,
			start: span[0].date,
			end: span[span.length - 1].date,
		});
	}

	// sort the spans by "efficiency"
	possibleSpans.sort(
		(a, b) => a.holidaysUsed - a.daysOff - (b.holidaysUsed - b.daysOff),
	);

	// remove overlapping spans
	for (let i = 0; i < possibleSpans.length; i++) {
		const span = possibleSpans[i];
		for (let j = i + 1; j < possibleSpans.length; j++) {
			const otherSpan = possibleSpans[j];
			if (span.start <= otherSpan.end && span.end >= otherSpan.start) {
				possibleSpans.splice(j, 1);
				j--;
			}
		}
	}

	return possibleSpans;
};

function getHolidays(from: Date, to: Date) {
	const hd = new Holidays("fi");

	const years = eachYearOfInterval({
		start: from,
		end: to,
	});

	const holidays = new Map<string, { date: Date; name: string }>();

	for (let y = 0; y < years.length; y++) {
		const yearsHolidays = hd.getHolidays(years[y].getFullYear());

		for (let i = 0; i < yearsHolidays.length; i++) {
			const holiday = yearsHolidays[i];
			if (holiday.name === "Uudenvuodenaatto") continue;

			const date = new Date(holiday.date);
			holidays.set(format(date, "yyyy-MM-dd"), {
				date,
				name: holiday.name,
			});
		}
	}

	return holidays;
}

function getNextHolidayYear() {
	return new Date(
		new Date().getMonth() < 3
			? new Date().getFullYear()
			: new Date().getFullYear() + 1,
		3,
		1,
	);
}

function getColor(number: number): string {
	const hue = (number * 37) % 360;
	const saturation = 70;
	const lightness = 50;

	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
