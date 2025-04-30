import { forwardRef } from "react";
import styles from "./input.module.scss";
import { IInputProps } from "./input.props";
import clsx from "clsx";

const Input = forwardRef<HTMLInputElement, IInputProps>(function InputRef(
	{ label = "Имя", isCheckbox, ...props },
	ref
) {
	return (
		<label
			className={clsx(styles["input"], isCheckbox && styles["input--checkbox"])}
		>
			<p className={styles["text"]}>{label}</p>
			<input className={clsx(styles["field"])} ref={ref} {...props} />
		</label>
	);
});

export default Input;
