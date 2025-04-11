import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBook } from "../../components/CardBookList/CardBookList";
import { get, push, ref, remove, set } from "firebase/database";
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

export const toggleFavoriteBook = createAsyncThunk<
	{ bookId: string; isFavorite: boolean },
	{ bookId: string; userId: string }
>("books/toggleFavoriteBook", async ({ bookId, userId }) => {
	const favoriteRef = ref(realtimeDb, `user_favorite/${userId}/${bookId}`);
	const snapshot = await get(favoriteRef);

	if (snapshot.exists()) {
		await remove(favoriteRef);
		return { bookId, isFavorite: false };
	} else {
		await set(favoriteRef, true);
		return { bookId, isFavorite: true };
	}
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

export const getUserFavoriteBooks = createAsyncThunk<IBook[], string>(
	"books/getUserFavoriteBooks",
	async (userId) => {
		const snapshot = await get(ref(realtimeDb, `user_favorite/${userId}`));
		const favoriteIds = snapshot.exists() ? Object.keys(snapshot.val()) : [];

		const booksPromises = favoriteIds.map(async (bookId) => {
			const bookRef = ref(realtimeDb, `books/${bookId}`);
			const bookSnapshot = await get(bookRef);
			return bookSnapshot.exists() ? bookSnapshot.val() : null;
    });
    
		const books = await Promise.all(booksPromises);
		
    return books.filter((book) => book !== null) as IBook[];
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
