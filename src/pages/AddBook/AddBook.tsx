import { FormEvent } from "react";
import styles from "./add-book.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { genres } from "../../const/const";
import { auth, database } from "../../firebase/config";
import { toast } from "react-toastify";
import { push, ref, set } from "firebase/database";

interface IAddBook {
	id: string;
	photoLink: string;
	bookName: string;
	author: string;
	genre: string;
	description: string;
	rating: string;
	userId: string;
	createdAt: number;
}

function AddBook() {
	async function handlerFormAddBook(e: FormEvent) {
		e.preventDefault();

		const user = auth.currentUser;
		if (!user) return;

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const bookRef = ref(database, "books");
		const newBookRef = push(bookRef);

		const bookData: IAddBook = {
			id: newBookRef.key,
			photoLink: formData.get("photo") as string,
			bookName: formData.get("nameBook") as string,
			author: formData.get("author") as string,
			genre: formData.get("genre") as string,
			description: formData.get("description") as string,
			rating: formData.get("rating") as string,
			userId: user.uid,
			createdAt: Date.now(),
		};

		try {
			await set(newBookRef, bookData)
			toast.success("Книга успешно добавлена!")
			form.reset()
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при добавлении книги");
		}
	}

	return (
		<div className={styles["add-book"]}>
			<h2>Добавить книгу</h2>
			<form className={styles["form"]} onSubmit={handlerFormAddBook}>
				<Input label="Фото книги" type="text" name="photo" required />
				<Input label="Название книги" type="text" name="nameBook" required />
				<Input label="Автор книги" type="text" name="author" required />
				<label className={styles["label"]}>
					<p className={styles["text"]}>Жанр книги</p>
					<select required className={styles["select"]} name="genre" id="genre-select">
						{genres.map((g, index) => (
							<option key={index} value={g.value}>
								{g.genre}
							</option>
						))}
					</select>
				</label>
				<label className={styles["label"]}>
					<p className={styles["text"]}>Мнение о книге или описание</p>
					<textarea required name="description" className={styles["textarea"]} />
				</label>

				<label className={styles["label"]}>
					<p className={styles["text"]}>Оценить книгу</p>
					<select required className={styles["select"]} name="rating" id="rating-select">
						<option value="">-- Оценить книгу --</option>
						<option value="0">Не рекомендую</option>
						<option value="3">Можно почитать</option>
						<option value="5">Обязательна к прочтению</option>
					</select>
				</label>
				<Button>Отправить</Button>
			</form>
		</div>
	);
}

export default AddBook;
