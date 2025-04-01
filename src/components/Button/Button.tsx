import clsx from "clsx";
import { IButtonProps } from "./button.props";
import styles from "./button.module.scss";

function Button({
	title,
	children,
	onClick,
	isFavorite,
	isSecond = false,
	isPrimary = false,
	isLink = false,
	isSvg = false,
}: IButtonProps) {
	return (
		<button
			onClick={onClick}
			title={title}
			className={clsx(
				styles["button"],
				isSecond && styles["second"],
				isPrimary && styles["primary"],
				isLink && styles["link"],
				isFavorite && styles["favorite"],
				isSvg && styles["onlySVG"]
			)}
		>
			{children}
		</button>
	);
}

export default Button;
