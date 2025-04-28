import { Database } from "../supabase/types";

export type Book = Database["public"]["Tables"]["bookList"]["Row"];
export type BookDto = Database["public"]["Tables"]["bookList"]["Insert"];
export type BookUpdate = Database["public"]["Tables"]["bookList"]["Update"];

// Тип избранного
export type FavoriteFromDB =
	Database["public"]["Tables"]["favoritesList"]["Row"];
