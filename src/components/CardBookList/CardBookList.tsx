import styles from "./card-book-list.module.scss";
import CardBook from "../../components/CardBook/CardBook";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export interface IBook {
	author: string;
	bookName: string;
	description?: string;
	genre?: string;
	id: string;
	rating?: string;
	createdAt?: number;
	userId?: string;
}

function CardBookList({ booksList }: { booksList: IBook[] }) {
	const { status } = useSelector((state: RootState) => state.book);
	
	return (
		<ul className={styles["homecard-book-list"]}>
			{booksList.map((book: IBook) => (
				<li key={book.id}>
					<CardBook
						userId={book.userId}
						{...book}
					/>
				</li>
			))}
			{status === "error" &&
				<p className="error">Произошла ошибка при загрузке данных. Попробуйте позже.</p>}
		</ul>
	);
}

export default CardBookList;
