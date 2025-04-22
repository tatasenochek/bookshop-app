import { useEffect } from "react";
import CardBookList from "../../components/CardBookList/CardBookList";
import styles from "./my-books.module.scss";
import { selectUserId } from "../../store/slice/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserBooks } from "../../store/services/bookApi";
import { selectUserBooks } from "../../store/slice/bookSlice";
import { AppDispatch } from "../../store/store";

function MyBooks() {
	const booksList = useSelector(selectUserBooks);
	// const allBooks = useSelector(selectAllBooks);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!userId) return;
		dispatch(getUserBooks(userId))
	}, [dispatch, userId]);

	return (
		<div className={styles["my-books"]}>
			<h2>Мои книги</h2>
			<CardBookList booksList={booksList} />
		</div>
	);
}

export default MyBooks;
