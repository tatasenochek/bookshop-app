import { Link } from "react-router-dom";
import { IBook } from "../CardBookList/CardBookList";
import styles from "./card-book.module.scss";
import { Book, BookHeart } from "lucide-react";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/slice/userSlice";
import { AppDispatch, RootState } from "../../store/store";
import { toggleFavoriteBook } from "../../store/services/bookApi";

function CardBook(props: IBook) {
	const userId = useSelector(selectUserId);
	const bookId = props.id;
	const isFavorite = useSelector((state: RootState) => state.book.favoriteBooksId.includes(bookId));
	const dispatch = useDispatch<AppDispatch>();
 
	async function handlerFavoriteButton() {
		if (!userId) return;
		dispatch(
			toggleFavoriteBook({
				bookId,
				userId,
			})
		);
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
				{userId && (
					<Button
						title={
							isFavorite
								? "Удалить из избранного"
								: "Добавить в избранное"
						}
						isSecond
						isSvg
						isFavorite={isFavorite}
						onClick={handlerFavoriteButton}
					>
						{isFavorite ? <BookHeart /> : <Book />}
					</Button>
				)}
			</div>
		</div>
	);
}

export default CardBook;
