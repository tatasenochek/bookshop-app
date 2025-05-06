import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./add-book.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { genres, ratings, ROUTES } from "../../const/const";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserUid } from "../../store/slice/userSlice";
import { Book } from "../../types/types";
import {
	useAddBookMutation,
	useUpdateBookMutation,
} from "../../store/services/bookMutations";

const initialState: Omit<Book, "book_id" | "created_at"> = {
	book_author: "",
	book_name: "",
	description: null,
	genre: genres[0].value,
	rating: ratings[0].value,
	user_id: "",
};

function AddBook() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const userId = useSelector(selectUserUid);
	const book: Book = state?.book;
	const [formData, setFormData] = useState<
		Omit<Book, "book_id" | "created_at">
	>(
		book
			? {
					book_name: book.book_name,
					book_author: book.book_author,
					genre: book.genre,
					description: book.description,
					rating: book.rating,
					user_id: userId!,
			  }
			: initialState
	);
	const [addBook, { isLoading: isAdding }] = useAddBookMutation();
	const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

	async function handlerFormSubmit(e: FormEvent) {
		e.preventDefault();
		if (!userId) {
			toast.error("Необходимо авторизоваться");
			return;
		}

		try {
			if (book) {
				await updateBook({
					id: book.book_id,
					updates: {
						book_name: formData.book_name,
						book_author: formData.book_author,
						genre: formData.genre,
						description: formData.description,
						rating: formData.rating,
					},
				}).unwrap();

				toast.success("Книга успешно обновлена!");
				navigate(`${ROUTES.BOOK}/${book.book_id}`);
			} else {
				await addBook({
					bookData: {
						...formData,
						user_id: userId,
					},
				}).unwrap();

				toast.success("Книга успешно добавлена!");
				navigate(ROUTES.HOME);
			}
		} catch (error: unknown) {
			let errorMessage;

			if (typeof error === "object" && error !== null && "data" in error) {
				errorMessage = (error as { data: string }).data;
			} else if (error instanceof Error) {
				errorMessage = error.message;
			}

			console.error(errorMessage);
			toast.error("Ошибка в процессе отправки данных");
		}
	}

	function handlerChange(
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return (
		<div className={styles["add-book"]}>
			{isAdding || isUpdating ? (
				<p>Отправляем данные..</p>
			) : (
				<>
					<h2>{book ? "Редактировать" : "Добавить книгу"}</h2>
					<form className={styles["form"]} onSubmit={handlerFormSubmit}>
						<Input
							label="Название книги"
							type="text"
							name="book_name"
							required
							value={formData.book_name}
							onChange={handlerChange}
						/>
						<Input
							label="Автор книги"
							type="text"
							name="book_author"
							required
							value={formData.book_author}
							onChange={handlerChange}
						/>
						<label className={styles["label"]}>
							<p className={styles["text"]}>Жанр книги</p>
							<select
								required
								className={styles["select"]}
								name="genre"
								id="genre-select"
								value={formData.genre}
								onChange={handlerChange}
							>
								{genres.map((g, index) => (
									<option key={index} value={g.value}>
										{g.genre}
									</option>
								))}
							</select>
						</label>
						<label className={styles["label"]}>
							<p className={styles["text"]}>Мнение о книге или описание</p>
							<textarea
								name="description"
								aria-label="Описание книги"
								className={styles["textarea"]}
								value={formData.description || ""}
								onChange={handlerChange}
							/>
						</label>

						<label className={styles["label"]}>
							<p className={styles["text"]}>Оценить книгу</p>
							<select
								required
								className={styles["select"]}
								name="rating"
								id="rating-select"
								value={formData.rating}
								onChange={handlerChange}
							>
								{ratings.map((r, index) => (
									<option key={index} value={r.value}>
										{r.rating}
									</option>
								))}
							</select>
						</label>
						<Button isPrimary disabled={isAdding || isUpdating}>
							{isAdding || isUpdating
								? "Сохранение..."
								: book
								? "Сохранить изменения"
								: "Добавить книгу"}
						</Button>
					</form>
				</>
			)}
		</div>
	);
}

export default AddBook;
