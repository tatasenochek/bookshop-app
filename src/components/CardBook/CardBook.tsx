import { Link } from "react-router-dom";
import { IBook } from "../CardBookList/CardBookList";
import styles from "./card-book.module.scss";

function CardBook(props: IBook) {
	return (
		<div className={styles["card-book"]}>
			<img
				className={styles["image"]}
				src={props.photoLink}
				alt={props.bookName}
				loading="lazy"
			/>
			<h3 className={styles["title"]}>{props.bookName}</h3>
			<p className={styles["author"]}>{props.author}</p>

			<div className={styles["action"]}>
				<Link className={styles["link"]} to={`/book/${props.id}`}>
					Подробнее
				</Link>
			</div>
		</div>
	);
}

export default CardBook;
