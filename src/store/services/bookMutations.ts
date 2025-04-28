import supabase from "../../supabase/config";
import { Book } from "../../types/types";
import { booksApi } from "./bookApi";
import { v4 as uuidv4 } from "uuid";

export const {
	useAddBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
} = booksApi.injectEndpoints({
	endpoints: (builder) => ({
		// добавление
		addBook: builder.mutation<
			Book,
			{ bookData: Omit<Book, "book_id" | "created_at">; userId: string }
		>({
			queryFn: async ({ bookData }) => {
				try {
					const newBook = {
						...bookData,
						book_id: uuidv4(),
						created_at: new Date().toISOString(),
					};

					const { data, error } = await supabase
						.from("bookList")
						.insert(newBook)
						.select()
						.single();

					if (error) {
						console.error("booksApi: Ошибка при добавлении книги:", error);
						return { error: { status: error.code, data: error.message } };
					}

					return {
						data: data as Book,
					};
				} catch (error) {
					console.error("booksApi: Неизвестная ошибка:", error);
					return { error: { status: 500, data: "Неизвестная ошибка" } };
				}
			},
			invalidatesTags: ["Book"],
		}),
		// редактирование
		updateBook: builder.mutation<Book, { id: string; updates: Partial<Book> }>({
			queryFn: async ({ id, updates }) => {
				try {
					const { data, error } = await supabase
						.from("bookList")
						.update(updates)
						.eq("book_id", id)
						.select()
						.single();

					if (error) {
						console.error("booksApi: Ошибка при редактировании книги:", error);
						return { error: { status: error.code, data: error.message } };
					}

					return {
						data: data as Book,
					};
				} catch (error) {
					console.error("booksApi: Неизвестная ошибка:", error);
					return { error: { status: 500, data: "Неизвестная ошибка" } };
				}
			},
			invalidatesTags: ["Book"],
		}),
		// удаление
		deleteBook: builder.mutation<void, string>({
			queryFn: async (id) => {
				try {
					const { error } = await supabase
						.from("bookList")
						.delete()
						.eq("book_id", id);

					if (error) {
						console.error("booksApi: Ошибка при удалении книги:", error);
						return { error: { status: error.code, data: error.message } };
					}
					return { data: undefined };
				} catch (error) {
					console.error("booksApi: Неизвестная ошибка:", error);
					return { error: { status: 500, data: "Неизвестная ошибка" } };
				}
			},
			invalidatesTags: ["Book"],
		}),
	}),
});
