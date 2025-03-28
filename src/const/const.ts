export const ROUTES = {
	HOME: "/",
	ADD_BOOK: "/add-book",
	MY_BOOKS: "/my-books",
	FAVORITE: "/favorite",
	SIGNIN: "/signin",
	SIGNUP: "/signup",
	BOOK: "/book/:id",
	NOT_FOUND: "/*",
};

interface IGenre {
	value: string;
	genre: string;
}

export const genres: IGenre[] = [
	{ value: "", genre: "-- Выберите жанр --" },
	{ value: "fantasy", genre: "Фантастика" },
	{ value: "fantasy", genre: "Фэнтези" },
	{ value: "detective", genre: "Детектив" },
	{ value: "horror", genre: "Ужасы" },
	{ value: "novel", genre: "Роман" },
	{ value: "adventure", genre: "Приключения" },
	{ value: "biography", genre: "Биография" },
	{ value: "poetry", genre: "Поэзия" },
	{ value: "drama", genre: "Драма" },
	{ value: "comedy", genre: "Комедия" },
	{ value: "children", genre: "Детская литература" },
	{ value: "classic", genre: "Классика" },
	{ value: "psychology", genre: "Психология" },
	{ value: "self-development", genre: "Саморазвитие" },
	{ value: "business", genre: "Бизнес-литература" },
];
