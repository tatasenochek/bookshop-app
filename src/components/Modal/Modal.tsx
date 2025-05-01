import { Dialog, DialogPanel } from "@headlessui/react";
import { ReactNode } from "react";
import styles from "./modal.module.scss";
import Button from "../Button/Button";
import { X } from "lucide-react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div className={styles["overlay"]}>
				<DialogPanel className={styles["panel"]}>
					<div className={styles["header"]}>
						<p className={styles["title"]}>{title}</p>
						<Button isSvg isSecond onClick={onClose}>
							<X />
						</Button>
					</div>
					<div className={styles["content"]}>{children}</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
