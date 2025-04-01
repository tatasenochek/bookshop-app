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

interface IRating {
	value: string;
	rating: string;
}

export const genres: IGenre[] = [
	{ value: "", genre: "-- Выберите жанр --" },
	{ value: "0", genre: "Фантастика" },
	{ value: "1", genre: "Фэнтези" },
	{ value: "2", genre: "Детектив" },
	{ value: "3", genre: "Ужасы" },
	{ value: "4", genre: "Роман" },
	{ value: "5", genre: "Приключения" },
	{ value: "6", genre: "Биография" },
	{ value: "7", genre: "Поэзия" },
	{ value: "8", genre: "Драма" },
	{ value: "9", genre: "Комедия" },
	{ value: "10", genre: "Детская литература" },
	{ value: "11", genre: "Классика" },
	{ value: "12", genre: "Психология" },
	{ value: "13", genre: "Саморазвитие" },
	{ value: "14", genre: "Бизнес-литература" },
];

export const ratings: IRating[] = [
	{ value: "", rating: "-- Оценить книгу --" },
	{ value: "0", rating: "Не рекомендую" },
	{ value: "1", rating: "Можно почитать" },
	{ value: "2", rating: "Обязательна к прочтению" },
];
