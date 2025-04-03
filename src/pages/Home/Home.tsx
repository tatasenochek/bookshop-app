import { useEffect, useState } from "react";
import CardBookList, {
	IBook,
} from "../../components/CardBookList/CardBookList";
import styles from "./home.module.scss";
import { get, ref } from "firebase/database";
import { realtimeDb } from "../../firebase/config";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/slice/userSlice";

function Home() {
	const [booksList, setBooksList] = useState<IBook[]>([]);
	const userId = useSelector(selectUserId);

	async function getBooks() {
		try {
			const booksRef = ref(realtimeDb, "books");
			const booksSnapshot = await get(booksRef);

			if (!booksSnapshot.exists()) return;

			const booksData = booksSnapshot.val();
			const booksArray = Object.keys(booksData).map((key) => ({
				...booksData[key],
				id: key,
			}));

			if (userId) {
				const favoritesRef = ref(realtimeDb, `user_favorite/${userId}`);
				const favoritesSnapshot = await get(favoritesRef);
				const favorites = favoritesSnapshot.exists()
					? favoritesSnapshot.val()
					: {};

				const booksWithFavorites = booksArray.map((book) => ({
					...book,
					isFavorite: !!favorites[book.id],
				}));

				setBooksList(booksWithFavorites);
			} else {
				const booksWithoutFavorites = booksArray.map((book) => ({
					...book,
					isFavorite: false,
				}));
				setBooksList(booksWithoutFavorites);
			}
		} catch (error) {
			console.error("Ошибка при загрузке книг:", error);
		}
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
