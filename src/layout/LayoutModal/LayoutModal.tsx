import { X } from "lucide-react";
import Button from "../../components/Button/Button";
import styles from "./layout-modal.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

	function handleClose() {
		setIsClosing(true);
		setTimeout(() => {
			navigate(backgroundPath, { replace: true });
		}, 300);
	}

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<div
			className={`${styles["overlay"]} ${isClosing ? styles["closing"] : ""}`}
			onClick={handleClose}
		>
			<dialog
				open
				className={styles["modal"]}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles["content"]}>
					<div className={styles["header"]}>
						<p>{title}</p>
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
