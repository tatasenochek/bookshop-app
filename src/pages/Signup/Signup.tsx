import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.scss";
import { FormEvent } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ISignupForm } from "./signup.props";
import { toast } from "react-toastify";
import { ROUTES } from "../../const/const";
import { useSignUpMutation } from "../../store/services/authApi";

function Signup() {
	const navigate = useNavigate();
	const [signUp, {isLoading}] = useSignUpMutation()

	async function handlerSubmitForm(e: FormEvent) {
		e.preventDefault();

		const target = e.target as typeof e.target & ISignupForm;
		const name = target.name.value.trim();
		const email = target.email.value.trim();
		const password = target.password.value.trim();

		try {
			const response = await signUp({email, password, name}).unwrap()

			if (response) {
				toast.success("Пользователь успешно зарегистрирован");
				navigate(ROUTES.HOME);
			} else {
				toast.error("Ошибка при регистрации пользователя");
			}
		} catch (error) {
			toast.error("Ошибка при регистрации пользователя");
			console.error("Ошибка при регистрации", error);
		}
	}

	return (
		<div className={styles["signup"]}>
			<h2>Регистрация</h2>
			<form onSubmit={handlerSubmitForm} className={styles["signup-form"]}>
				<Input type="text" label="Имя" name="name" minLength={3} required />
				<Input
					type="email"
					label="Электронная почта"
					name="email"
					minLength={3}
					required
				/>
				<Input
					type="password"
					label="Пароль"
					name="password"
					minLength={6}
					required
				/>
				<Button isPrimary disabled={isLoading}>
					{isLoading ? "Регистрация..." : "Отправить"}
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
