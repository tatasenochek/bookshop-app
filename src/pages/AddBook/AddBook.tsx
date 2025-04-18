import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./add-book.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { genres, ratings } from "../../const/const";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { IBook } from "../../components/CardBookList/CardBookList";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/slice/userSlice";
import { addBook, updateBook } from "../../store/services/bookApi";
import { AppDispatch } from "../../store/store";

const initialState: IBook = {
	id: "",
	photoLink: "",
	bookName: "",
	author: "",
	genre: "",
	description: "",
	rating: "",
};

function AddBook() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const book: IBook = state?.book;
	const [formData, setFormData] = useState<IBook>(initialState);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch<AppDispatch>();

	async function handlerFormSubmit(e: FormEvent) {
		e.preventDefault();
		if (!userId) return;

		try {
			if (book) {
				dispatch(
					updateBook({
						book: {
							...formData,
							id: book.id,
							userId,
							createdAt: book.createdAt,
						},
						userId,
					})
				);

				toast.success("Книга успешно обновлена!");
				navigate(`/book/${book.id}`);
			} else {
				dispatch(
					addBook({
						book: {
							...formData,
							userId: userId,
						},
						userId,
					})
				);

				toast.success("Книга успешно добавлена!");
				navigate("/");
			}
		} catch (e) {
			console.log(e);
			toast.error("Ошибка при добавлении книги");
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

	useEffect(() => {
		if (book) {
			setFormData({
				id: book.id,
				photoLink: book.photoLink,
				bookName: book.bookName,
				author: book.author,
				genre: book.genre!,
				description: book.description!,
				rating: book.rating!,
			});
		}
	}, [book]);

	return (
		<div className={styles["add-book"]}>
			<h2>{book ? "Редактировать" : "Добавить книгу"}</h2>
			<form className={styles["form"]} onSubmit={handlerFormSubmit}>
				<Input
					label="Фото книги"
					type="text"
					name="photoLink"
					required
					value={formData.photoLink}
					onChange={handlerChange}
				/>
				<Input
					label="Название книги"
					type="text"
					name="bookName"
					required
					value={formData.bookName}
					onChange={handlerChange}
				/>
				<Input
					label="Автор книги"
					type="text"
					name="author"
					required
					value={formData.author}
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
						required
						name="description"
						className={styles["textarea"]}
						value={formData.description}
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
				<Button isPrimary>
					{book ? "Сохранить изменения" : "Добавить книгу"}
				</Button>
			</form>
		</div>
	);
}

export default AddBook;
