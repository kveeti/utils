import { type ComponentProps, forwardRef, useId } from "react";

type Props = ComponentProps<"input"> & {
	label?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
	({ label, required, id, ...rest }, ref) => {
		const innerIdid = useId();
		const innerId = id || innerIdid;

		if (!label)
			return (
				<input
					id={innerId}
					autoComplete="off"
					required={required}
					className="focus w-full rounded-md border-[1px] border-transparent bg-primary-600 p-2 duration-200 hover:border-primary-400 focus-visible:border-blue-500"
					{...rest}
					ref={ref}
				/>
			);

		return (
			<div className="flex w-full flex-col gap-1">
				<label htmlFor={innerId}>{label}</label>

				<input
					id={innerId}
					autoComplete="off"
					required={required}
					className="focus w-full rounded-md border-[1px] border-transparent bg-primary-600 p-2 duration-200 hover:border-primary-400 focus-visible:border-blue-500"
					{...rest}
					ref={ref}
				/>
			</div>
		);
	},
);

Input.displayName = "Input";
