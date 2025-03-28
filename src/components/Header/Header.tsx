import styles from "./header.module.scss";
import logo from "../../assets/books.png";
import Search from "../Search/Search";
import Navigation from "../Navigation/Navigation";

function Header() {
	
	return (
		<header className={styles["header"]}>
			<div className={styles["logo"]}>
				<img
					className={styles["image"]}
					src={logo}
					alt="логотип книжной лавки"
				/>
				<h1 className={styles["title"]}>Книжная лавка </h1>
			</div>
			<Search />
			<Navigation />
		</header>
	);
}

export default Header;
