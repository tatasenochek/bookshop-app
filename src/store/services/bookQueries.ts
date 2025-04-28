import supabase from "../../supabase/config";
import { Book } from "../../types/types";
import { booksApi } from "./bookApi";

export const { useGetAllBooksQuery, useGetBookByIdQuery } =
	booksApi.injectEndpoints({
		endpoints: (builder) => ({
			// получение всех книг
			getAllBooks: builder.query<Book[], void>({
				queryFn: async () => {
					try {
						const { data, error } = await supabase.from("bookList").select("*");

						if (error) {
							console.error(
								"booksApi: Ошибка в процессе получения данных:",
								error
							);
							return { error: { status: error.code, data: error.message } };
						}

						return { data: data as Book[] };
					} catch (error) {
						console.error("booksApi: Неизвестная ошибка:", error);
						return { error: { status: 500, data: "Неизвестная ошибка" } };
					}
				},
				providesTags: ["Book"],
			}),

			// получение книги по id
			getBookById: builder.query<Book, string>({
				queryFn: async (id) => {
					try {
						const { data, error } = await supabase
							.from("bookList")
							.select("*")
							.eq("book_id", id)
							.single();

						if (error) {
							console.error(
								"booksApi: Ошибка в процессе получения данных:",
								error
							);
							return { error: { status: error.code, data: error.message } };
						}

						return { data: data as Book };
					} catch (error) {
						console.error("booksApi: Неизвестная ошибка:", error);
						return { error: { status: 500, data: "Неизвестная ошибка" } };
					}
				},
				providesTags: ["Book"],
			}),
		}),
	});
