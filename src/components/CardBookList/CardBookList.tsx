import { useEffect, useState } from "react";
import styles from "./card-book-list.module.scss";
import { realtimeDb } from "../../firebase/config";
import { get, ref } from "firebase/database";
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
	isFavorite?: boolean;
}

function CardBookList() {
  const [booksList, setBooksList] = useState<IBook[]>([]);

	async function getBooks() {
		const bookRef = ref(realtimeDb, "books");
		const snapshot = await get(bookRef);
		if (!snapshot.exists()) {
			console.log("Ошибка при получении данных");
		}
    setBooksList(Object.values(snapshot.val()));
  }

	useEffect(() => {
    getBooks();
	}, []);

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
