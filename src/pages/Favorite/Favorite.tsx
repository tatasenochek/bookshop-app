import { useEffect, useState } from "react";
import styles from "./favorite.module.scss";
import CardBookList, { IBook } from "../../components/CardBookList/CardBookList";
import { realtimeDb } from "../../firebase/config";
import { get, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/slice/userSlice";

function Favorite() {
  const [favoriteBooks, setFavoriteBooks] = useState<IBook[]>([]);
	const userId = useSelector(selectUserId);

	 async function getFavoriteBooks() {
			try {
				// Получаем список ID избранных книг
				const favoritesRef = ref(realtimeDb, `user_favorite/${userId}`);
				const favoritesSnapshot = await get(favoritesRef);

				if (!favoritesSnapshot.exists()) {
					setFavoriteBooks([]);
					return;
				}

				const favoriteIds = Object.keys(favoritesSnapshot.val());

				// Получаем данные по каждой избранной книге
				const booksPromises = favoriteIds.map((bookId) =>
					get(ref(realtimeDb, `books/${bookId}`))
				);

				const booksSnapshots = await Promise.all(booksPromises);
				const favoriteBooksData = booksSnapshots
					.filter((snap) => snap.exists())
					.map((snap) => ({
						...snap.val(),
						id: snap.key,
						isFavorite: true,
					}));

				setFavoriteBooks(favoriteBooksData);
			} catch (error) {
				console.error("Ошибка при загрузке избранного:", error);
			}
		}

		useEffect(() => {
			getFavoriteBooks();
		}, []);
	

	return (
		<div className={styles["favorite"]}>
			<h2>Избранные книги</h2>
			{favoriteBooks.length > 0 ? (
				<CardBookList booksList={favoriteBooks} />
			) : (
				<p>У вас пока нет избранных книг 🤷‍♂️</p>
			)}
		</div>
	);
}

export default Favorite;
