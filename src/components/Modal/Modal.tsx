import { Dialog, DialogPanel } from "@headlessui/react";
import styles from "./modal.module.scss";
import Button from "../Button/Button";
import { X } from "lucide-react";
import { IModalProps } from "./modal.props";

export function Modal({ isOpen, onClose, title, children }: IModalProps) {
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
