import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				"bp-1": "770px",
				"bp-2": "1150px",
			},
			colors: {
				primary: colors.gray,
			},
		},
	},
	plugins: [],
};
