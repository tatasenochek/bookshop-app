import styles from "./signin.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import { ROUTES } from "../../const/const";
import { useSignInMutation } from "../../store/services/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninFormData, SigninSchema } from "../../types/types";

function Signin() {
	const navigate = useNavigate();
	const location = useLocation();
	const [signIn] = useSignInMutation();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
	} = useForm<SigninFormData>({
		resolver: zodResolver(SigninSchema),
		mode: "onBlur",
		reValidateMode: "onChange",
	});

	async function onSubmit(data: SigninFormData) {
		if (isSubmitting) return;

		try {
			await signIn(data).unwrap();
			toast.success("Вы успешно авторизованы");
			navigate(location.state?.backgroundPath?.pathname || ROUTES.HOME, {
				state: { modalOpen: location.state?.modalOpen },
			});
		} catch (error) {
			const e = error as { status: number; data: string };
			if (e.status === 401) {
				toast.error("Неверный email или пароль");
			} else {
				toast.error("Ошибка при регистрации пользователя");
			}
			console.error("Ошибка при регистрации пользователя", error);
		}
	}

	return (
		<div className={styles["signin"]}>
			<h2>Войти</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles["signin-form"]}>
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
					{isSubmitting ? "Вход..." : "Войти"}
				</Button>
			</form>
			<div className={styles["action"]}>
				<span className={styles["text"]}>Нет аккаунта?</span>
				<Link
					className={styles["link"]}
					state={{ backgroundPath: location }}
					to={`${ROUTES.SIGNUP}`}
				>
					Зарегистрироваться
				</Link>
			</div>
		</div>
	);
}

export default Signin;
