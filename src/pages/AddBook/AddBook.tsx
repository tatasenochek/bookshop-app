import styles from "./add-book.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { genres, ratings, ROUTES } from "../../const/const";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserUid } from "../../store/slice/userSlice";
import { Book, BookFormData, BookSchema } from "../../types/types";
import {
	useAddBookMutation,
	useUpdateBookMutation,
} from "../../store/services/bookMutations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useCallback } from "react";

function AddBook() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const userId = useSelector(selectUserUid);
	const book: Book = state?.book;
	const [addBook, { isLoading: isAdding }] = useAddBookMutation();
	const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<BookFormData>({
		resolver: zodResolver(BookSchema),
		mode: "all",
		defaultValues: book
			? {
					book_name: book.book_name,
					book_author: book.book_author,
					genre: book.genre,
					description: book.description || "",
					rating: book.rating,
			  }
			: {
					genre: "",
					rating: "",
			  },
	});

	const onSubmit = useCallback(
		async (data: BookFormData) => {
			if (!userId) {
				toast.error("Необходимо авторизоваться");
				return;
			}

			try {
				if (book) {
					await updateBook({
						id: book.book_id,
						updates: {
							book_name: data.book_name,
							book_author: data.book_author,
							genre: data.genre,
							description: data.description,
							rating: data.rating,
						},
					}).unwrap();

					toast.success("Книга успешно обновлена!");
					navigate(`${ROUTES.BOOK}/${book.book_id}`);
				} else {
					await addBook({
						bookData: {
							...data,
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
		},
		[addBook, book, navigate, updateBook, userId]
	);

	return (
		<div className={styles["add-book"]}>
			{isAdding || isUpdating ? (
				<p>Отправляем данные..</p>
			) : (
				<>
					<h2>{book ? "Редактировать" : "Добавить книгу"}</h2>
					<form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
						<Input
							label="Название книги"
							aria-label="Название книги"
							{...register("book_name")}
							error={errors.book_name?.message}
						/>
						<Input
							label="Автор книги"
							aria-label="Автор книги"
							{...register("book_author")}
							error={errors.book_author?.message}
						/>
						<label className={styles["label"]}>
							<p className={styles["text"]}>Жанр книги</p>
							<select
								className={clsx(
									styles["select"],
									errors.genre && styles["select--error"]
								)}
								aria-label="Жанр книги"
								{...register("genre")}
							>
								{genres.map((g, index) => (
									<option key={index} value={g.value}>
										{g.genre}
									</option>
								))}
							</select>
							{errors.genre && (
								<span className={styles["error"]} aria-live="assertive">
									{errors.genre?.message}
								</span>
							)}
						</label>
						<label className={styles["label"]}>
							<p className={styles["text"]}>Мнение о книге или описание</p>
							<textarea
								aria-label="Описание книги"
								className={styles["textarea"]}
								{...register("description")}
							/>
						</label>
						<label className={styles["label"]}>
							<p className={styles["text"]}>Оценить книгу</p>
							<select
								aria-label="Рейтинг книги"
								className={clsx(
									styles["select"],
									errors.genre && styles["select--error"]
								)}
								{...register("rating")}
							>
								{ratings.map((r, index) => (
									<option key={index} value={r.value}>
										{r.rating}
									</option>
								))}
							</select>
							{errors.rating && (
								<span className={styles["error"]} aria-live="assertive">
									{errors.rating?.message}
								</span>
							)}
						</label>
						<Button
							isPrimary
							disabled={!isValid || isAdding || isUpdating}
							title={!isValid ? "Заполните все поля правильно" : undefined}
						>
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
