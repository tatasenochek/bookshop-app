import { useNavigate, useParams } from "react-router-dom";
import styles from "./book.module.scss";
import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { genres, ratings } from "../../const/const";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/slice/userSlice";
import { AppDispatch } from "../../store/store";
import { selectBookById } from "../../store/slice/bookSlice";
import { deleteBook, getBookById } from "../../store/services/bookApi";
import { toast } from "react-toastify";

function Book() {
	const { id } = useParams();
	const navigate = useNavigate();
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch<AppDispatch>();
	const book = useSelector(selectBookById);
	const isOwner = userId === book?.userId;

	async function handlerDeleteButton() {
		const res = confirm("Вы действительно хотите удалить книгу?");

		if (res) {
			await dispatch(deleteBook({ bookId: id!, userId: userId! }));
			toast.success("Книга успешно удалена!");
			navigate("/");
		}

		return;
	}

	function handlerEditButton() {
		const res = confirm("Вы хотите редактировать книгу?");
		if (!res) {
			return;
		}

		navigate("/add-book", {
			state: { book },
		});
	}

	useEffect(() => {
		if (!id) return;
		dispatch(getBookById(id));
	}, [id, dispatch]);

	return (
		<div className={styles["book"]}>
			<div className={styles["book-info"]}>
				<h2>{book?.bookName}</h2>
				<p className={styles["author"]}>{book?.author}</p>
				<p className={styles["info"]}>
					<b>Жанр:</b>{" "}
					<span>
						{book && genres.find((g) => g.value === book.genre)?.genre}
					</span>
				</p>
				<p className={styles["info"]}>
					<b>Описание или мнение о книге:</b> <span>{book?.description}</span>
				</p>
				<p className={styles["info"]}>
					<b>Рейтинг:</b>{" "}
					<span>
						{book && ratings.find((r) => r.value === book.rating)?.rating}
					</span>
				</p>
				{isOwner && (
					<div className={styles["book-action"]}>
						<Button isPrimary onClick={handlerEditButton}>
							Редактировать
						</Button>
						<Button
							title="Удалить книгу"
							isSecond
							isSvg
							onClick={handlerDeleteButton}
						>
							<Trash2 />
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Book;
