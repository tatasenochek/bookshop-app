import clsx from "clsx";
import { IButtonProps } from "./button.props";
import styles from "./button.module.scss";

function Button({ children, className, onClick }: IButtonProps) {
	return (
		<button
			onClick={onClick}
			className={clsx(styles["button"], className && styles[className])}>
			{children}
		</button>
	);
}

export default Button;
