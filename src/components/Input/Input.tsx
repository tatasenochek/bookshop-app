import { forwardRef, useState } from "react";
import styles from "./input.module.scss";
import { IInputProps } from "./input.props";
import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";

const Input = forwardRef<HTMLInputElement, IInputProps>(function InputRef(
	{ label = "Имя", isCheckbox, error, type, ...props },
	ref
) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const inputType = type === "password" && showPassword ? "text" : type;

	return (
		<label
			className={clsx(
				styles["input"],
				isCheckbox && styles["input--checkbox"],
				error && styles["input--error"]
			)}
		>
			<p className={styles["text"]}>{label}</p>
			{type === "password" ? (
				<div className={clsx(styles["wrapper-field"])}>
					<input
						className={clsx(styles["field"])}
						ref={ref}
						type={inputType}
						{...props}
					/>
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className={styles["toggle-button"]}
						title={showPassword ? "Скрыть пароль" : "Показать пароль"}
						aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
					>
						{showPassword ? <EyeClosed /> : <Eye />}
					</button>
				</div>
			) : (
				<input
					className={clsx(styles["field"])}
					ref={ref}
					type={inputType}
					{...props}
				/>
			)}
			{error && (
				<span className={styles["error"]} aria-live="assertive">
					{error}
				</span>
			)}
		</label>
	);
});

export default Input;
