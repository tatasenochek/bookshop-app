import styles from "./card-book-list.module.scss";
import CardBook from "../../components/CardBook/CardBook";
import { Book } from "../../types/types";

function CardBookList({ booksList }: { booksList: Book[] }) {
	
	return (
		<ul className={styles["homecard-book-list"]}>
			{booksList.map((book: Book) => (
				<li key={book.book_id}>
					<CardBook
						{...book}
					/>
				</li>
			))}
			</ul>
	);
}

export default CardBookList;
