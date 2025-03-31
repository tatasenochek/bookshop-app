import { Link } from "react-router-dom";
import { IBook } from "../CardBookList/CardBookList";
import styles from "./card-book.module.scss";
import { Book, BookHeart } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

function CardBook(props: IBook) {
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	async function handlerFavoriteButton() {
		setIsFavorite(!isFavorite);
	}

	return (
		<div className={styles["card-book"]}>
			<img
				className={styles["image"]}
				src={props.photoLink}
				alt={props.bookName}
			/>
			<h3 className={styles["title"]}>{props.bookName}</h3>
			<p className={styles["author"]}>{props.author}</p>

			<div className={styles["action"]}>
				<Link className={styles["link"]} to={`/book/${props.id}`}>
					Подробнее
				</Link>
				<button
					title="Добавить в избранное"
					className={clsx(
						styles["button"],
						isFavorite && styles["button-favorite"]
					)}
					onClick={handlerFavoriteButton}
				>
					{isFavorite ? <BookHeart /> : <Book />}
				</button>
			</div>
		</div>
	);
}

export default CardBook;
