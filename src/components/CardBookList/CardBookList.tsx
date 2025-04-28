import styles from "./card-book-list.module.scss";
import CardBook from "../../components/CardBook/CardBook";
import { Book } from "../../types/types";

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
