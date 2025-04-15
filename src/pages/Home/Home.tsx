import { useEffect } from "react";
import CardBookList from "../../components/CardBookList/CardBookList";
import styles from "./home.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getAllBooks } from "../../store/services/bookApi";
import { selectAllBooks } from "../../store/slice/bookSlice";

function Home() {
	const booksList = useSelector(selectAllBooks);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getAllBooks());
	}, [dispatch]);

	return (
		<div className={styles["home"]}>
			<CardBookList booksList={booksList} />
		</div>
	);
}

export default Home;
