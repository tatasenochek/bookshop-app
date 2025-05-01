import styles from "./header.module.scss";
import logo from "../../assets/books.png";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { ROUTES } from "../../const/const";

function Header() {
	return (
		<header className={styles["header"]}>
			<Link to={`${ROUTES.HOME}`} >
				<div className={styles["logo"]}>
					<img
						className={styles["image"]}
						src={logo}
						alt="логотип книжной лавки"
						loading="lazy"
					/>
					<h1 className={styles["title"]}>Книжная лавка </h1>
				</div>
			</Link>
			<Navigation />
		</header>
	);
}

export default Header;
