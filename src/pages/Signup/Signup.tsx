import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.scss";
import { FormEvent } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { ISignupForm } from "./signup.props";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ROUTES } from "../../const/const";

function Signup() {
	const navigate = useNavigate()

	async function handlerSubmitForm(e: FormEvent) {
		e.preventDefault();

		e.preventDefault();
		const target = e.target as typeof e.target & ISignupForm;
		const name = target.name.value;
		const email = target.email.value;
		const password = target.password.value;

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			const user = res.user;
			console.log(user);
			if (user) {
				await setDoc(doc(db, "User", user.uid), {
					email: user.email,
					name,
				});
			}
			toast.success("Пользователь успешно зарегистрирован", {
				position: "top-right",
				autoClose: 4000,
			});
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
					minLength={3}
					required
				/>
				<Button>Отправить</Button>
			</form>
			<span className={styles["text"]}>Есть акканут?</span>
			<Link className={styles["link"]} to="/signin">
				Войти
			</Link>
		</div>
	);
}

export default Signup;
