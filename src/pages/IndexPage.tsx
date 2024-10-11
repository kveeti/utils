import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
	ArrowsDiagonalMinimize2,
	GasStation,
	type Icon as IconType,
	ReportMoney,
	IceCream,
} from "tabler-icons-react";

export function IndexPage() {
	return (
		<main className="mx-auto flex h-screen w-full justify-center pt-[10vh]">
			<div className="flex w-full max-w-[400px] flex-col gap-8 p-3">
				<h1 className="text-4xl font-bold sm:text-5xl">Utils</h1>

				<div className="flex flex-col gap-3 rounded-md border-[1px] border-primary-700 p-3">
					<h1 className="text-2xl font-medium sm:text-3xl">
						Calculators
					</h1>

					<div className="flex flex-col gap-3">
						<PageLink href="/calculators/salary" icon={ReportMoney}>
							<span className="text-lg">Salary</span>
						</PageLink>

						<PageLink href="/calculators/fuel" icon={GasStation}>
							<span className="text-lg">Fuel</span>
						</PageLink>

						<PageLink
							href="/calculators/ppi"
							icon={ArrowsDiagonalMinimize2}
						>
							<span className="text-lg">Ppi</span>
						</PageLink>

						<PageLink href="/calculators/holidays" icon={IceCream}>
							<span className="text-lg">Holidays</span>
						</PageLink>
					</div>
				</div>
			</div>
		</main>
	);
}

function PageLink(props: {
	href: string;
	icon: IconType;
	children: ReactNode;
}) {
	const Icon = props.icon;

	return (
		<Link
			to={props.href}
			className="flex cursor-pointer items-center gap-4 rounded-md border-[1px] border-primary-700 bg-primary-800 p-4 transition-all duration-150 hover:border-primary-600 hover:bg-primary-700 active:scale-95"
		>
			<Icon
				className="rounded-md border-[1px] border-primary-600 bg-primary-700 p-2"
				size={50}
				strokeWidth={0.8}
			/>
			{props.children}
		</Link>
	);
}
