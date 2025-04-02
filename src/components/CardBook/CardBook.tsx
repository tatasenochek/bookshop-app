import { Link } from "react-router-dom";
import { IBook } from "../CardBookList/CardBookList";
import styles from "./card-book.module.scss";
import { Book, BookHeart } from "lucide-react";
import Button from "../Button/Button";
import { auth, realtimeDb } from "../../firebase/config";
import { toast } from "react-toastify";
import { ref, set } from "firebase/database";
import { useState } from "react";

function CardBook(props: IBook) {
	const [isFavorite, setIsFavorite] = useState(props.isFavorite || false);
	const user = auth.currentUser;
	if (!user) return;

	async function handlerFavoriteButton(bookId: string) {
		try {
			const favoriteRef = ref(
				realtimeDb,
				`user_favorite/${user!.uid}/${bookId}`
			);
			await set(favoriteRef, !isFavorite);

			toast.success(
				!isFavorite
					? "Книга добавлена в избранное"
					: "Книга удалена из избранного"
			);
			setIsFavorite(!isFavorite);
		} catch (error) {
			console.error("Ошибка при добавлении в избранное:", error);
			toast.error("Ошибка при добавлении в избранное");
		}
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
				{user && (
					<Button
						title={
							isFavorite ? "Удалить из избранного" : "Добавить в избранное"
						}
						isSecond
						isSvg
						isFavorite={isFavorite}
						onClick={() => handlerFavoriteButton(props.id)}
					>
						{isFavorite ? <BookHeart /> : <Book />}
					</Button>
				)}
			</div>
		</div>
	);
}

export default CardBook;
