import { Link, useLocation } from "react-router-dom";
import { IBook } from "../CardBookList/CardBookList";
import styles from "./card-book.module.scss";
import { getNameIcon } from "./helper-getNameIcon";
import { ROUTES } from "../../const/const";

function CardBook(props: IBook) {
	const location = useLocation();

	return (
		<div className={styles["card-book"]}>
			<div className={styles["icon"]}>{getNameIcon(props.author)}</div>
			<h3 className={styles["title"]}>{props.bookName}</h3>
			<p className={styles["author"]}>{props.author}</p>
			<div className={styles["action"]}>
				<Link
					className={styles["link"]}
					state={{ backgroundPath: location }}
					to={`${ROUTES.BOOK}/${props.id}`}
				>
					Подробнее
				</Link>
			</div>
		</div>
	);
}

export default CardBook;
