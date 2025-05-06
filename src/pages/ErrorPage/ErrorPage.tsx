import { useNavigate } from "react-router-dom";
import styles from "./error-page.module.scss";
import logo from "../../assets/books.png";

function ErrorPage() {
	const navigate = useNavigate();

	const handleReload = () => {
		window.location.reload();
	};

	const handleGoHome = () => {
		navigate("/");
	};
	return (
		<div className={styles["error-page"]}>
			<header className={styles["header"]}>
				<div className={styles["logo"]} onClick={handleGoHome}>
					<img
						className={styles["image"]}
						src={logo}
						alt="логотип книжной лавки"
						loading="lazy"
					/>
					<h1 className={styles["title"]}>Книжная лавка </h1>
				</div>
			</header>
			<main className={styles["main"]}>
				<h2>Упс! Ошибка</h2>
				<p>Попробуйте перезагрузить страницу или зайти позже.</p>
				<button onClick={handleReload}>
					Обновить
				</button>
			</main>
		</div>
	);
}

export default ErrorPage;
