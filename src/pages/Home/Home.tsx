import CardBookList from "../../components/CardBookList/CardBookList";
import styles from "./home.module.scss";

function Home() {
	return (
		<div className={styles["home"]}>
			<CardBookList />
		</div>
	);
}

export default Home;
