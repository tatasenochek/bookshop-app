import styles from "./card-book-list.module.scss";
import CardBook from "../../components/CardBook/CardBook";

export interface IBook {
	author: string;
	bookName: string;
	description?: string;
	genre?: string;
	id: string;
	photoLink: string;
	rating?: string;
	createdAt?: number;
	userId?: string;
}

function CardBookList({ booksList }: { booksList: IBook[] }) {
	return (
		<ul className={styles["homecard-book-list"]}>
			{booksList.map((book: IBook) => (
				<li key={book.id}>
					<CardBook
						photoLink={book.photoLink}
						bookName={book.bookName}
            author={book.author}
            id={book.id}
            userId={book.userId}
					/>
				</li>
			))}
		</ul>
	);
}

export default CardBookList;
