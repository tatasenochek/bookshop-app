import { FormEvent } from "react";
import styles from "./signin.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ISigninForm } from "./signin.props";
import { toast } from "react-toastify";
import { ROUTES } from "../../const/const";
import { useSignInMutation } from "../../store/services/authApi";

function Signin() {
	const navigate = useNavigate();
	const location = useLocation();
	const [signIn, { isLoading }] = useSignInMutation();

	async function handlerSubmitForm(e: FormEvent) {
		e.preventDefault();
		const target = e.target as typeof e.target & ISigninForm;
		const email = target.email.value;
		const password = target.password.value;

		try {
			await signIn({ email, password }).unwrap();
			toast.success("Вы успешно авторизованы");
			navigate(location.state?.backgroundPath?.pathname || ROUTES.HOME, {
				state: { modalOpen: location.state?.modalOpen },
			});
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при регистрации пользователя");
		}
	}

	return (
		<div className={styles["signin"]}>
			<h2>Войти</h2>
			<form onSubmit={handlerSubmitForm} className={styles["signin-form"]}>
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
					{isLoading ? "Вход..." : "Войти"}
				</Button>
			</form>
			<div className={styles["action"]}>
				<span className={styles["text"]}>Есть акканут?</span>
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
