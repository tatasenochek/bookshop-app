import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import { ROUTES } from "../../const/const";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutation } from "../../store/services/authApi";
import { SignupFormData, SignupSchema } from "../../types/types";

function Signup() {
	const navigate = useNavigate();
	const [signUp] = useSignUpMutation();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
	} = useForm<SignupFormData>({
		resolver: zodResolver(SignupSchema),
		mode: "onBlur",
		reValidateMode: "onChange",
	});

	async function onSubmit(data: SignupFormData) {
		if (isSubmitting) return;

		try {
			const response = await signUp(data).unwrap();

			if (response) {
				toast.success("Пользователь успешно зарегистрирован");
				navigate(ROUTES.HOME);
			}
		} catch (error) {
			const e = error as { status: number; data: string}
			if (e.status === 422) {
				toast.error("Пользователь с таким email уже существует");
			} else {
				toast.error("Ошибка при регистрации");
			}
			console.error("Ошибка при регистрации", error);
		}
	}

	return (
		<div className={styles["signup"]}>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles["signup-form"]}>
				<Input label="Имя" {...register("name")} error={errors.name?.message} />
				<Input
					label="Электронная почта"
					{...register("email")}
					error={
						errors.email?.type === "required"
							? "Обязательное поле"
							: errors.email?.type === "invalid_string"
							? "Некорректный формат email"
							: errors.email?.message
					}
				/>
				<Input
					type="password"
					label="Пароль"
					{...register("password")}
					error={errors.password?.message}
				/>
				<Button isPrimary disabled={!isValid || isSubmitting}>
					{isSubmitting ? "Регистрация..." : "Отправить"}
				</Button>
			</form>
			<div className={styles["action"]}>
				<span className={styles["text"]}>Есть акканут?</span>
				<Link className={styles["link"]} to={`${ROUTES.SIGNIN}`}>
					Войти
				</Link>
			</div>
		</div>
	);
}

export default Signup;
