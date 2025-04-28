import { Link, useLocation } from "react-router-dom";
import styles from "./card-book.module.scss";
import { getNameIcon } from "./helper-getNameIcon";
import { ROUTES } from "../../const/const";
import { Book } from "../../types/types";

function CardBook(props: Book) {
	const location = useLocation();

	return (
		<div className={styles["card-book"]}>
			<div className={styles["icon"]}>{getNameIcon(props.book_author)}</div>
			<h3 className={styles["title"]}>{props.book_name}</h3>
			<p className={styles["author"]}>{props.book_author}</p>
			<div className={styles["action"]}>
				<Link
					className={styles["link"]}
					state={{ backgroundPath: location }}
					to={`${ROUTES.BOOK}/${props.book_id}`}
				>
					Подробнее
				</Link>
			</div>
		</div>
	);
}

export default CardBook;
