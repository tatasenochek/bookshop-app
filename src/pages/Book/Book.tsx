import { useNavigate, useParams } from "react-router-dom";
import styles from "./book.module.scss";
import { useEffect, useState } from "react";
import { get, ref, remove } from "firebase/database";
import { realtimeDb } from "../../firebase/config";
import { IBook } from "../../components/CardBookList/CardBookList";
import { ChevronLeft, Trash2 } from "lucide-react";
import { genres, ratings } from "../../const/const";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/slice/userSlice";

function Book() {
	const { id } = useParams();
	const navigate = useNavigate();
	const userId = useSelector(selectUserId);

	const [book, setBook] = useState<IBook | null>(null);
	const [isOwner, setIsOwner] = useState<boolean>(false);

	async function getBookById(id: string) {
		const bookRef = ref(realtimeDb, `books/${id}`);
		const snapshot = await get(bookRef);

		if (!snapshot) {
			return;
		}

		setBook(snapshot.val());
	}

	async function handlerDeleteButton() {
		const res = confirm("Вы действительно хотите удалить книгу?");

		if (res) {
			const bookRef = ref(realtimeDb, `books/${id}`);
			await remove(bookRef);
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
		if (id) {
			getBookById(id);
		}

		return;
	}, [id]);

	useEffect(() => {
		if (userId === book?.userId) {
			setIsOwner(true);
		}
	}, [book]);

	return (
		<>
			<Button isLink onClick={() => navigate(-1)}>
				<ChevronLeft /> Назад
			</Button>
			<div className={styles["book"]}>
				<img
					className={styles["image"]}
					src={book?.photoLink}
					alt={book?.bookName}
				/>
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
		</>
	);
}

export default Book;
