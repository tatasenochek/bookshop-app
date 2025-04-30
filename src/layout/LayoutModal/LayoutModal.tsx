import { X } from "lucide-react";
import Button from "../../components/Button/Button";
import styles from "./layout-modal.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function LayoutModal({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	const navigate = useNavigate();
	const location = useLocation();
	const backgroundPath = location.state?.backgroundPath || "/";
	const [isClosing, setIsClosing] = useState(false);
	const modalRef = useRef<HTMLDialogElement>(null);

	function handleClose() {
		setIsClosing(true);
		setTimeout(() => {
			navigate(backgroundPath, { replace: true });
		}, 300);
	}

	const trapFocus = (e: KeyboardEvent) => {
		if (!modalRef.current) return;

		const focusableElements = modalRef.current.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[
			focusableElements.length - 1
		] as HTMLElement;

		if (e.key === "Tab") {
			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement.focus();
					e.preventDefault();
				}
			} else {
				if (document.activeElement === lastElement) {
					firstElement.focus();
					e.preventDefault();
				}
			}
		}
	};

	useEffect(() => {
		document.body.style.overflow = "hidden";

		if (modalRef.current) {
			modalRef.current.focus();
		}

		document.addEventListener("keydown", trapFocus);

		return () => {
			document.body.style.overflow = "auto";
			document.removeEventListener("keydown", trapFocus);
		};
	}, []);

	return (
		<div
			className={`${styles["overlay"]} ${isClosing ? styles["closing"] : ""}`}
			onClick={handleClose}
		>
			<dialog
				ref={modalRef}
				open
				className={styles["modal"]}
				onClick={(e) => e.stopPropagation()}
				tabIndex={-1}
				aria-modal="true"
				aria-labelledby="modal-title"
			>
				<div className={styles["content"]}>
					<div className={styles["header"]}>
						<p id="modal-title">{title}</p>
						<Button
							title="Закрыть"
							aria-label="Закрыть модальное окно"
							isSecond
							isSvg
							onClick={handleClose}
						>
							<X />
						</Button>
					</div>
					{children}
				</div>
			</dialog>
		</div>
	);
}

export default LayoutModal;
