import styles from "./not-found.module.scss";
import notFound from "../../assets/notFound.webp";
import { Link } from "react-router-dom";
import { ROUTES } from "../../const/const";

function NotFound() {
	return (
		<div className={styles["not-found"]}>
			<img src={notFound} alt="Страница не найдена" loading="lazy" />
			<div>
				<p>Упс.. К сожалению, такой страницы не найдено😔</p>
				<Link to={`${ROUTES.HOME}`}>Перейти на главную</Link>
			</div>
		</div>
	);
}

export default NotFound;
