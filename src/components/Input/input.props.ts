import { InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	isCheckbox?: boolean;
	error?: string;
}
