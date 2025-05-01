import { ReactNode } from "react";

export interface IModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
}
