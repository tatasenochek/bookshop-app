import { useEffect, useState } from "react";
import CardBookList, {
	IBook,
} from "../../components/CardBookList/CardBookList";
import styles from "./my-books.module.scss";
import { get, onValue, ref } from "firebase/database";
import { realtimeDb } from "../../firebase/config";
import { selectUserId } from "../../store/slice/userSlice";
import { useSelector } from "react-redux";

function MyBooks() {
	const [booksList, setBooksList] = useState<IBook[]>([]);
	const userId = useSelector(selectUserId);

	async function getBooks() {
		const bookRef = ref(realtimeDb, `user_books/${userId}`);

		onValue(bookRef, async (snapshot) => {
			if (snapshot.exists()) {
				const bookIds = Object.keys(snapshot.val());
				const booksPromises = bookIds.map((bookId) =>
					get(ref(realtimeDb, `books/${bookId}`))
				);

				const booksSnapshots = await Promise.all(booksPromises);
				const userBooks = booksSnapshots
					.filter((snap) => snap.exists())
					.map((snap) => ({
						...snap.val(),
						id: snap.key,
					}));
				setBooksList(userBooks);
			}
		});
	}

	useEffect(() => {
		getBooks();
	}, []);

	return (
		<div className={styles["my-books"]}>
			<h2>Мои книги</h2>
			<CardBookList booksList={booksList} />
		</div>
	);
}

export default MyBooks;
