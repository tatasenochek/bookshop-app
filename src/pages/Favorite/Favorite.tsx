import { useEffect } from "react";
import styles from "./favorite.module.scss";
import CardBookList from "../../components/CardBookList/CardBookList";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/slice/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUserFavoriteBooks } from "../../store/services/bookApi";
import { selectFavoriteBooks } from "../../store/slice/bookSlice";

function Favorite() {
  const favoriteBooks = useSelector(selectFavoriteBooks);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch<AppDispatch>();

		useEffect(() => {
			if (userId) {
				dispatch(getUserFavoriteBooks(userId));
			}
		}, [userId, dispatch]);
	

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
