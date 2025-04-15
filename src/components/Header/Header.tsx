import styles from "./header.module.scss";
import logo from "../../assets/books.png";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header className={styles["header"]}>
			<Link to="/">
				<div className={styles["logo"]}>
					<img
						className={styles["image"]}
						src={logo}
						alt="логотип книжной лавки"
					/>
					<h1 className={styles["title"]}>Книжная лавка </h1>
				</div>
			</Link>
			<Navigation />
		</header>
	);
}

export default Header;
