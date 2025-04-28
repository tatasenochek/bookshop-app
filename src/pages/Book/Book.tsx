import { useNavigate, useParams } from "react-router-dom";
import styles from "./book.module.scss";
import { Trash2 } from "lucide-react";
import { genres, ratings, ROUTES } from "../../const/const";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { selectUserUid } from "../../store/slice/userSlice";
import { toast } from "react-toastify";
import { useGetBookByIdQuery } from "../../store/services/bookQueries";
import { useDeleteBookMutation } from "../../store/services/bookMutations";

function Book() {
	const { id: bookId } = useParams();
	const navigate = useNavigate();
	const userId = useSelector(selectUserUid);

	const {
		data: book,
		isLoading,
		isError,
		refetch,
	} = useGetBookByIdQuery(bookId || "", {
		skip: !bookId,
	});
	const [deleteBook] = useDeleteBookMutation();

	const isOwner = userId === book?.user_id;

	async function handlerDeleteButton() {
		const res = confirm("Вы действительно хотите удалить книгу?");

		if (res) {
			await deleteBook(bookId!).unwrap();
			toast.success("Книга успешно удалена!");
			navigate(ROUTES.HOME);
		}

		return;
	}

	function handlerEditButton() {
		const res = confirm("Вы хотите редактировать книгу?");
		if (!res) {
			return;
		}

		navigate(ROUTES.ADD_BOOK, {
			state: { book },
		});
	}

	if (isLoading) {
		return (
			<div className={styles["book"]}>
				<p>Загружаем данные о книге..</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className={styles["book-error"]}>
				<p>Не удалось загрузить книги</p>
				<Button isPrimary onClick={refetch}>
					Попробовать снова
				</Button>
			</div>
		);
	}

	return (
		<div className={styles["book"]}>
			<div className={styles["book-info"]}>
				<h2>{book?.book_name}</h2>
				<p className={styles["author"]}>{book?.book_author}</p>
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
