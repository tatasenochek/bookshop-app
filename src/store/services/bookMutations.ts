import { PostgrestError } from "@supabase/supabase-js";
import supabase from "../../supabase/config";
import { Book } from "../../types/types";
import { booksApi } from "./bookApi";
import { v4 as uuidv4 } from "uuid";

// type BooksResponse = {
// 	data: Book[];
// 	count: number;
// };

export const { useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } =
	booksApi.injectEndpoints({
		endpoints: (builder) => ({
			// добавление
			addBook: builder.mutation<
				Book,
				{ bookData: Omit<Book, "book_id" | "created_at"> }
			>({
				query: ({ bookData }) => ({
					queryFn: async () => {
						const newBook = {
							...bookData,
							book_id: uuidv4(),
							created_at: new Date().toISOString(),
						};

						const response = await supabase
							.from("bookList")
							.insert(newBook)
							.select()
							.single();

						return response as { data: Book; error: PostgrestError | null };
					},
				}),
				invalidatesTags: ["Book"],
			}),
			// редактирование
			updateBook: builder.mutation<
				Book,
				{ id: string; updates: Partial<Book> }
			>({
				query: ({ id, updates }) => ({
					queryFn: async () => {
						const response = await supabase
							.from("bookList")
							.update(updates)
							.eq("book_id", id)
							.select()
							.single();

						return response as { data: Book; error: PostgrestError | null };
					},
				}),
				invalidatesTags: ["Book"],
			}),
			// удаление
			deleteBook: builder.mutation<void, string>({
				query: (id) => ({
					queryFn: async () => {
						const response = await supabase
							.from("bookList")
							.delete()
							.eq("book_id", id)
							.select();

						return response as { data: null };
					},
				}),
				invalidatesTags: ["Book"],
			}),
		}),
	});
