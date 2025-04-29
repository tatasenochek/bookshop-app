import supabase from "../../supabase/config";
import { Book } from "../../types/types";
import { booksApi } from "./bookApi";

export const { useGetAllBooksQuery, useGetBookByIdQuery } =
	booksApi.injectEndpoints({
		endpoints: (builder) => ({
			// получение всех книг
      getAllBooks: builder.query<
        { data: Book[], count: number},
        { page: number, limit: number }
    >({
				queryFn: async ({page, limit}) => {
        try {
            const from = (page - 1) * limit;
            const to = from + limit - 1;
          
						const { data, error, count } = await supabase.from("bookList").select("*", { count: "exact" }).range(from, to);

						if (error) {
							console.error(
								"booksApi: Ошибка в процессе получения данных:",
								error
							);
							return { error: { status: error.code, data: error.message } };
						}

						return { 
              data: { 
                data: data as Book[], 
                count: count || 0 
              } 
            };
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
