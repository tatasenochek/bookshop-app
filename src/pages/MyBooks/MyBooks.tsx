import { useEffect, useState } from "react";
import CardBookList, {
	IBook,
} from "../../components/CardBookList/CardBookList";
import styles from "./my-books.module.scss";
import { get, onValue, ref } from "firebase/database";
import { auth, realtimeDb } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function MyBooks() {
	const [booksList, setBooksList] = useState<IBook[]>([]);
	const user = auth.currentUser;

	async function getBooks(user: string) {
		const bookRef = ref(realtimeDb, `user_books/${user}`);

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
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				if (currentUser.uid) {
					getBooks(currentUser.uid);
				}
			} else {
				console.log("Пользователь не авторизован");
			}
		});

		return () => unsubscribe();
	}, [user]);

	return (
		<div className={styles["my-books"]}>
			<CardBookList booksList={booksList} />
		</div>
	);
}

export default MyBooks;
