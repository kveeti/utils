import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { IndexPage } from "./pages/IndexPage.tsx";

const SalaryCalculatorPage = React.lazy(() =>
	import("./pages/salaryCalculator/SalaryCalculatorPage.tsx").then((module) => ({
		default: module.SalaryCalculatorPage,
	}))
);

const FuelCalculatorPage = React.lazy(() =>
	import("./pages/fuelCalculator/FuelCalculator.tsx").then((module) => ({
		default: module.FuelCalculatorPage,
	}))
);

const PpiCalculatorPage = React.lazy(() =>
	import("./pages/ppiCalculator.tsx").then((module) => ({
		default: module.PpiCalculatorPage,
	}))
);

const HolidayCalculator = React.lazy(() =>
	import("./pages/holidayCalculator/holidayCalculator.tsx").then((module) => ({
		default: module.HolidayCalculator,
	}))
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Suspense>
			<BrowserRouter>
				<Routes>
					<Route index element={<IndexPage />} />
					<Route path="/calculators/salary" element={<SalaryCalculatorPage />} />
					<Route path="/calculators/fuel" element={<FuelCalculatorPage />} />
					<Route path="/calculators/ppi" element={<PpiCalculatorPage />} />
					<Route path="/calculators/holidays" element={<HolidayCalculator />} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	</React.StrictMode>
);
