import { ReactNode } from "react";

export interface IButtonProps {
	children: ReactNode;
	onClick?: () => void;
	isSecond?: boolean;
	isPrimary?: boolean;
	isLink?: boolean;
	isFavorite?: boolean;
	isSvg?: boolean;
	title?: string;
}
