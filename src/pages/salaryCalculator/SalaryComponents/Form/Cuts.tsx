import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Minus, Plus } from "tabler-icons-react";

import { useSalaryContext } from "../../SalaryContext/SalaryContextProvider";

export function Cuts() {
	const { form } = useSalaryContext();

	return (
		<div className="flex flex-col">
			<div className="mb-2 flex items-center justify-between">
				<h3>Cuts</h3>

				<div className="flex gap-2">
					<button
						className="rounded-md border border-gray-700 p-2"
						onClick={() =>
							form.addCut({
								amount: undefined,
								type: "%",
							})
						}
					>
						<Plus size={15} />
					</button>

					<button
						className="rounded-md border border-gray-700 p-2"
						onClick={() => form.removeCut(-1)}
					>
						<Minus size={15} />
					</button>
				</div>
			</div>

			<AnimatePresence initial={false}>
				{form.cuts.map((cut, index) => (
					<motion.div
						key={cut.id}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden"
					>
						<div className="flex pb-2">
							<input
								type="number"
								className="w-full rounded-bl-md rounded-tl-md bg-gray-600 p-2 outline-none"
								{...form.register(
									`cuts.${index}.amount` as const,
									{
										valueAsNumber: true,
									},
								)}
							/>

							<div className="relative">
								<select
									className="appearance-none rounded-br-md rounded-tr-md border-l-2 border-l-gray-500 bg-gray-600 py-2 pl-3 pr-8 outline-none"
									{...form.register(
										`cuts.${index}.type` as const,
									)}
								>
									<option value="%">%</option>
									<option value="€">€</option>
								</select>

								<div className="absolute right-[0.55rem] top-[0.8rem]">
									<ChevronDown size={15} />
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
