import { FormEvent } from "react";
import styles from "./signin.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ISigninForm } from "./signin.props";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { ROUTES } from "../../const/const";

function Signin() {
const navigate = useNavigate();

	async function handlerSubmitForm(e: FormEvent) {
		e.preventDefault();
		const target = e.target as typeof e.target & ISigninForm;
		const email = target.email.value;
		const password = target.password.value;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate(ROUTES.HOME);
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при регистрации пользователя", {
				position: "top-right",
				autoClose: 4000,
			});
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
					minLength={3}
					required
				/>
				<Button>Отправить</Button>
			</form>
			<span className={styles["text"]}>Нет акканута?</span>
			<Link className={styles["link"]} to="/signup">
				Зарегистрироваться
			</Link>
		</div>
	);
}

export default Signin;
