import { z } from "zod";
import { Database } from "../supabase/types";

export type Book = Database["public"]["Tables"]["bookList"]["Row"];
export type BookDto = Database["public"]["Tables"]["bookList"]["Insert"];
export type BookUpdate = Database["public"]["Tables"]["bookList"]["Update"];

export const EmailSchema = z
	.string()
	.min(1, "Email обязателен")
	.regex(
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		"Должен содержать @ и домен (например: user@example.com)"
	);

export const PasswordSchema = z
	.string()
	.min(6, "Пароль должен быть не короче 6 символов");

export const SigninSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema,
});

export const SignupSchema = z.object({
	name: z.string().min(3, "Имя должно быть не короче 3 символов"),
	email: EmailSchema,
	password: PasswordSchema,
});

export const BookSchema = z.object({
	book_name: z.string().min(1, "Название книги обязательно"),
	book_author: z.string().min(3, "Автор книги обязателен"),
	genre: z.string().min(1, "Выберите жанр"),
	description: z.string().nullable(),
	rating: z.string().min(1, "Поставьте оценку"),
});

export type BookFormData = z.infer<typeof BookSchema>;
export type SignupFormData = z.infer<typeof SignupSchema>;
export type SigninFormData = z.infer<typeof SigninSchema>;
