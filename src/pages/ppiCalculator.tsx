import { useForm } from "react-hook-form";

import { Input } from "../Ui/Input";
import { formatNumber } from "../utils/formatNumber";
import { useSetTitle } from "../utils/useSetTitle";

export function PpiCalculatorPage() {
	useSetTitle("Calculators | PPI");

	const form = useForm({
		defaultValues: {
			screenWidth: 2560,
			screenHeight: 1440,
			inches: 27,
		},
	});

	const screenWidth = form.watch("screenWidth");
	const screenHeight = form.watch("screenHeight");
	const inches = form.watch("inches");

	const ppi = Math.sqrt(screenWidth ** 2 + screenHeight ** 2) / inches;
	const ppcm = ppi / 2.54;
	const totalPixels = screenWidth * screenHeight;

	return (
		<main className="mx-auto w-full max-w-[400px] p-3 pt-[5vh] sm:pt-[10vh]">
			<h1 className="pb-4 text-3xl font-medium">
				Pixels per inch calculator
			</h1>

			<div className="flex flex-col gap-3">
				<div className="flex w-full flex-col gap-5 rounded-md border-[1px] border-primary-700 bg-primary-800 p-3">
					<Input
						label="Screen width"
						type="number"
						step={"any"}
						{...form.register("screenWidth", {
							valueAsNumber: true,
						})}
					/>

					<Input
						label="Screen height"
						type="number"
						step={"any"}
						{...form.register("screenHeight", {
							valueAsNumber: true,
						})}
					/>

					<Input
						label="Inches"
						type="number"
						step={"any"}
						{...form.register("inches", { valueAsNumber: true })}
					/>
				</div>

				<div className="rounded-md border-[1px] border-primary-700 bg-primary-800 p-3">
					<h2 className="pb-2 text-2xl font-medium">Results</h2>

					<div className="flex flex-col gap-2 text-lg">
						<div>
							<div className="flex justify-between">
								<span>Total pixels</span>
								<span>{formatNumber(totalPixels)}</span>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2 text-lg">
						<div>
							<div className="flex justify-between">
								<span>Pixels per inch</span>
								<span>{formatNumber(ppi)}</span>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2 text-lg">
						<div>
							<div className="flex justify-between">
								<span>Pixels per cm</span>
								<span>{formatNumber(ppcm)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
