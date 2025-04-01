import { useEffect, useState } from "react";
import CardBookList, {
	IBook,
} from "../../components/CardBookList/CardBookList";
import styles from "./home.module.scss";
import { get, ref } from "firebase/database";
import { realtimeDb } from "../../firebase/config";

function Home() {
	const [booksList, setBooksList] = useState<IBook[]>([]);

	async function getBooks() {
		const bookRef = ref(realtimeDb, "books");
		const snapshot = await get(bookRef);
		if (!snapshot.exists()) {
			console.log("Ошибка при получении данных");
		}
		setBooksList(Object.values(snapshot.val()));
	}

	useEffect(() => {
		getBooks();
	}, []);

	return (
		<div className={styles["home"]}>
			<CardBookList booksList={booksList} />
		</div>
	);
}

export default Home;
