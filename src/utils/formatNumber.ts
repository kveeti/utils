const locale = "fi-FI";

export const formatNumber = (
	number: number | null | undefined,
	emptyAsZero = true,
	spaces = true
) => {
	if (!number || isNaN(number)) {
		return emptyAsZero ? "0" : "--";
	}

	const formatted = Intl.NumberFormat(locale).format(number);

	return spaces ? formatted : formatted.replace(/\s/g, "");
};

export const formatNumberNoSpaces = (number: number | null | undefined) =>
	!number || isNaN(number) ? "--" : Intl.NumberFormat(locale).format(number).replace(/\s/g, "");

export const formatCurrency = (number: number) =>
	isNaN(number)
		? "--"
		: Intl.NumberFormat(locale, {
				style: "currency",
				currency: "EUR",
		  }).format(number);
