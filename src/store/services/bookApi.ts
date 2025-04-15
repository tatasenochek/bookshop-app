import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBook } from "../../components/CardBookList/CardBookList";
import { get, push, ref, set } from "firebase/database";
import { realtimeDb } from "../../firebase/config";

export const addBook = createAsyncThunk<IBook, { book: IBook; userId: string }>(
	"books/addBook",
	async ({ book, userId }) => {
		const bookRef = push(ref(realtimeDb, "books"));
		const newBook: IBook = {
			...book,
			id: bookRef.key,
			userId,
			createdAt: Date.now(),
		};

		await Promise.all([
			set(bookRef, newBook),
			set(ref(realtimeDb, `user_books/${userId}/${bookRef.key}`), true),
		]);

		return newBook;
	}
);

export const updateBook = createAsyncThunk<
	IBook,
	{ book: IBook; userId: string }
>("books/updateBook", async ({ book, userId }) => {
	const updateBook: IBook = {
		...book,
		id: book.id,
		userId,
		createdAt: book.createdAt,
	};

	await set(ref(realtimeDb, `/books/${book.id}`), updateBook);
	return updateBook;
});

export const getAllBooks = createAsyncThunk<IBook[]>(
	"books/getAllBooks",
	async () => {
		const snapshot = await get(ref(realtimeDb, "books"));

		if (!snapshot.exists()) return [];

		return Object.keys(snapshot.val()).map((key) => ({
			...snapshot.val()[key],
			id: key,
		}));
	}
);

export const getUserBooks = createAsyncThunk<IBook[], string>(
	"books/getUserBooks",
	async (userId) => {
		const snapshot = await get(ref(realtimeDb, `user_books/${userId}`));

		if (!snapshot.exists()) return [];

		const userBookIds = Object.keys(snapshot.val());

		const booksPromises = userBookIds.map(async (bookId) => {
			const bookSnapshot = await get(ref(realtimeDb, `books/${bookId}`));
			return {
				id: bookId,
				...(bookSnapshot.val() as Omit<IBook, "id">),
			};
		});

		return await Promise.all(booksPromises);
	}
);

export const getBookById = createAsyncThunk<
	IBook | undefined,
	string | undefined
>("books/getBookById", async (bookId) => {
	const snapshot = await get(ref(realtimeDb, `books/${bookId}`));

	if (!snapshot.exists()) return;

	return snapshot.val();
});
