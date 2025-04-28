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
import { useAddBookMutation, useUpdateBookMutation } from "../../store/services/bookMutations";

const initialState: Book = {
	book_author: "",
	book_id: "",
	book_name: "",
	created_at: "",
	description: null,
	genre: genres[0].value,
	rating: ratings[0].value,
	user_id: "",
};

function AddBook() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const book: Book = state?.book;
	const [formData, setFormData] = useState<Book>(
		book
			? {
					book_id: book.book_id,
					book_name: book.book_name,
					book_author: book.book_author,
					genre: book.genre!,
					description: book.description!,
					rating: book.rating!,
					user_id: book.user_id,
					created_at: book.created_at,
			  }
			: initialState
	);
	const userId = useSelector(selectUserUid);
	const [addBook, { isLoading: isAdding }] = useAddBookMutation();
	const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

	async function handlerFormSubmit(e: FormEvent) {
		e.preventDefault();
		if (!userId) return;

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
				});

				toast.success("Книга успешно обновлена!");
				navigate(`${ROUTES.BOOK}/${book.book_id}`);
			} else {
				await addBook({
					bookData: {
						book_name: formData.book_name,
						book_author: formData.book_author,
						genre: formData.genre,
						description: formData.description,
						rating: formData.rating,
						user_id: userId
					},
					userId: userId
				}).unwrap();

				toast.success("Книга успешно добавлена!");
				navigate(ROUTES.HOME);
			}
		} catch (error) {
			console.error("Ошибка в процессе отправки данных:", error);
			toast.error("Ошибка в процессе отправки данных");
		}
	}


	function handlerChange(
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	}

	return (
		<div className={styles["add-book"]}>
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
		</div>
	);
}

export default AddBook;
