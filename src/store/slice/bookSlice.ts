import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IBook } from "../../components/CardBookList/CardBookList";
import {
	addBook,
	toggleFavoriteBook,
	getAllBooks,
	getBookById,
	getUserBooks,
	updateBook,
  getUserFavoriteBooks,
} from "../services/bookApi";

enum Status {
	IDLE = "idle",
	LOADING = "loading",
	SUCCESS = "completed",
	ERROR = "error",
}

interface IBookState {
	currentBook: IBook | null;
	allBooks: IBook[];
	userBooks: IBook[];
	favoriteBooks: IBook[];
	favoriteBooksId: string[];
	status: Status;
	isFavorite: boolean;
}

const initialState: IBookState = {
	allBooks: [],
	currentBook: null,
	userBooks: [],
  favoriteBooks: [],
  favoriteBooksId: [],
	status: Status.IDLE,
	isFavorite: false,
};

export const bookSlice = createSlice({
	name: "book",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//addBook - добавление книги
			.addCase(addBook.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addCase(addBook.fulfilled, (state, action: PayloadAction<IBook>) => {
				state.status = Status.SUCCESS;
				state.allBooks.push(action.payload);
				state.userBooks.push(action.payload);
			})
			.addCase(addBook.rejected, (state) => {
				state.status = Status.ERROR;
			})
			// updateBook - редактирование книги
			.addCase(updateBook.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addCase(updateBook.fulfilled, (state, action: PayloadAction<IBook>) => {
				state.status = Status.SUCCESS;
				state.allBooks = state.allBooks.map((book) =>
					book.id === action.payload.id ? action.payload : book
				);
				state.userBooks = state.allBooks.map((book) =>
					book.id === action.payload.id ? action.payload : book
				);
			})
			.addCase(updateBook.rejected, (state) => {
				state.status = Status.ERROR;
			})
			// // toggleFavoriteBook - добавление в избранное
			.addCase(toggleFavoriteBook.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addCase(
				toggleFavoriteBook.fulfilled,
				(
					state,
					action: PayloadAction<{ bookId: string; isFavorite: boolean }>
				) => {
					state.status = Status.SUCCESS;

					if (action.payload.isFavorite) {
						if (!state.favoriteBooksId.includes(action.payload.bookId)) {
							state.favoriteBooksId.push(action.payload.bookId);
						}
					} else {
						state.favoriteBooksId = state.favoriteBooksId.filter(
							(id) => id !== action.payload.bookId
						);
          }
          state.favoriteBooks = state.favoriteBooks.filter(
						(book) =>
							book.id !== action.payload.bookId || action.payload.isFavorite
					);
				}
			)
			.addCase(toggleFavoriteBook.rejected, (state) => {
				state.status = Status.ERROR;
			})
			// getAllBooks - получить все книги
			.addCase(getAllBooks.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addCase(
				getAllBooks.fulfilled,
				(state, action: PayloadAction<IBook[]>) => {
					state.status = Status.SUCCESS;
					state.allBooks = action.payload;
				}
			)
			.addCase(getAllBooks.rejected, (state) => {
				state.status = Status.ERROR;
				state.allBooks = [];
			})
			// getBookById - получить книгу по ID
			.addCase(getBookById.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addCase(
				getBookById.fulfilled,
				(state, action: PayloadAction<IBook | undefined>) => {
					state.status = Status.SUCCESS;
					if (action.payload) {
						state.currentBook = action.payload;
					}
				}
			)
			.addCase(getBookById.rejected, (state) => {
				state.status = Status.ERROR;
				state.currentBook = null;
			})
			// getUserBooks - получить все книги пользователя
			.addCase(getUserBooks.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addCase(
				getUserBooks.fulfilled,
				(state, action: PayloadAction<IBook[]>) => {
					state.status = Status.SUCCESS;
					state.userBooks = action.payload;
				}
			)
			.addCase(getUserBooks.rejected, (state) => {
				state.status = Status.ERROR;
				state.userBooks = [];
			})
			// getUserFavoriteBooks - получить все книги пользователя
			.addCase(getUserFavoriteBooks.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addCase(
				getUserFavoriteBooks.fulfilled,
				(state, action: PayloadAction<IBook[]>) => {
					state.status = Status.SUCCESS;
          state.favoriteBooks = action.payload;
          state.favoriteBooksId = action.payload.map((book) => book.id);
				}
			)
			.addCase(getUserFavoriteBooks.rejected, (state) => {
				state.status = Status.ERROR;
				state.favoriteBooks = [];
			});
	},
});

export default bookSlice.reducer;
export const selectAllBooks = (state: RootState) => state.book.allBooks;
export const selectBookById = (state: RootState) => state.book.currentBook;
export const selectUserBooks = (state: RootState) => state.book.userBooks;
export const selectFavoriteBooks = (state: RootState) =>
  state.book.favoriteBooks;
export const selectFavoriteBookIds = (state: RootState) =>
	state.book.favoriteBooksId;

