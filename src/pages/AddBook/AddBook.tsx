import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./add-book.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { genres, ratings } from "../../const/const";
import { auth, realtimeDb } from "../../firebase/config";
import { toast } from "react-toastify";
import { push, ref, set } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";
import { IBook } from "../../components/CardBookList/CardBookList";

interface IBookData {
	id?: string;
	photoLink: string;
	bookName: string;
	author: string;
	genre: string;
	description: string;
	rating: string;
	userId?: string;
	createdAt?: number;
}

const initialState: IBookData = {
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
	const [formData, setFormData] = useState<IBookData>(initialState);

	async function handlerFormSubmit(e: FormEvent) {
		e.preventDefault();

		const user = auth.currentUser;
		if (!user) return;

		try {
			if (book) {
				const bookRef = ref(realtimeDb, `/books/${book.id}`);
				await set(bookRef, {
					...formData,
					id: book.id,
					userId: user.uid,
					createdAt: book.createdAt,
				});
				toast.success("Книга успешно обновлена!");
				navigate(`/book/${book.id}`);
			} else {
				const bookRef = ref(realtimeDb, "books");
				const newBookRef = push(bookRef);
				await set(newBookRef, {
					...formData,
					id: newBookRef.key,
					userId: user.uid,
					createdAt: Date.now(),
				});
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
				<Button isPrimary>{book ? "Сохранить изменения" : "Добавить книгу"}</Button>
			</form>
		</div>
	);
}

export default AddBook;
