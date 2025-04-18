import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBook } from "../../components/CardBookList/CardBookList";
import { RealtimeDbService } from "./realtimeDbService";

export const addBook = createAsyncThunk<IBook, { book: IBook; userId: string }>(
	"books/addBook",
	async ({ book, userId }) => RealtimeDbService.addBook(book, userId)
);

export const deleteBook = createAsyncThunk<
	string,
	{ bookId: string; userId: string }
>("books/deleteBook", async ({ bookId, userId }) => {
	await RealtimeDbService.deleteBook(bookId, userId);
	return bookId;
});

export const updateBook = createAsyncThunk<
	IBook,
	{ book: IBook; userId: string }
>("books/updateBook", async ({ book, userId }) => {
	const updateBook = await RealtimeDbService.updateBook(book, userId);
	return updateBook;
});

export const getAllBooks = createAsyncThunk<IBook[]>(
	"books/getAllBooks",
	async () => RealtimeDbService.getAllBooks()
);

export const getUserBooks = createAsyncThunk<IBook[], string>(
	"books/getUserBooks",
	async (userId) => RealtimeDbService.getUserBooks(userId)
);

export const getBookById = createAsyncThunk<
	IBook | undefined,
	string | undefined
>("books/getBookById", async (bookId) => {
	if (!bookId) return;

	return await RealtimeDbService.getBookById(bookId);
});
