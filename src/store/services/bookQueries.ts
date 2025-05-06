import supabase from "../../supabase/config";
import { Book } from "../../types/types";
import { booksApi } from "./bookApi";

export const { useGetAllBooksQuery, useGetBookByIdQuery } = booksApi.injectEndpoints({
	endpoints: (builder) => ({
		// получение всех книг
		getAllBooks: builder.query<
			{ data: Book[]; count: number },
			{ page: number; limit: number; search?: string; userId?: string }
		>({
			query: ({ page, limit, search, userId }) => ({
				queryFn: async () => {
					const from = (page - 1) * limit;
					const to = from + limit - 1;

					let query = supabase.from("bookList").select("*", { count: "exact" });

					if (search) {
						query = query.or(
							`book_name.ilike.%${search}%,book_author.ilike.%${search}%`
						);
					}

					if (userId) {
						query = query.eq("user_id", userId);
					}

					const { data, count} = await query.range(from, to);

					return {
						data: {
							data: data || [],
							count: count || 0,
						},
					};
				},
			}),
			providesTags: ["Book"],
		}),

		// получение книги по id
		getBookById: builder.query<Book, string>({
			query: (id) => ({
				queryFn: async () => {
					const response = await supabase
						.from("bookList")
						.select("*")
						.eq("book_id", id)
						.maybeSingle();

					return response as { data: Book };
				},
			}),
			providesTags: ["Book"],
		}),
	}),
});
