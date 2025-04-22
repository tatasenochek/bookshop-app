import { IBook } from "../../components/CardBookList/CardBookList";

export const RealtimeDbService = {
	// Инициализация
	async getDb() {
		const { getDatabase } = await import("firebase/database");
		return getDatabase();
	},

	// Добавление книги
	async addBook(book: Omit<IBook, "id">, userId: string): Promise<IBook> {
		const db = await this.getDb();
		const { push, ref, set } = await import("firebase/database");

		const bookRef = push(ref(db, "books"));
		const newBook: IBook = {
			...book,
			id: bookRef.key!,
			userId,
			createdAt: Date.now(),
		};

		await Promise.all([
			set(bookRef, newBook),
			set(ref(db, `user_books/${userId}/${bookRef.key}`), true),
		]);

		return newBook;
	},

	// Изменение книги
	async updateBook(book: IBook, userId: string): Promise<IBook> {
		const db = await this.getDb();
		const { ref, set } = await import("firebase/database");
		const updateBook: IBook = {
			...book,
			userId,
			createdAt: book.createdAt || Date.now(),
		};

		await set(ref(db, `books/${book.id}`), updateBook);
		return updateBook;
	},

	// Удаление книги
	async deleteBook(bookId: string, userId: string): Promise<void> {
		const db = await this.getDb();
		const { ref, remove } = await import("firebase/database");

		await Promise.all([
			remove(ref(db, `books/${bookId}`)),
			remove(ref(db, `user_books/${userId}/${bookId}`)),
		]);
	},

	// Получение книги по ID
	async getBookById(bookId: string): Promise<IBook | undefined> {
		const db = await this.getDb();
		const { get, ref } = await import("firebase/database");

		const snapshot = await get(ref(db, `books/${bookId}`));
		return snapshot.exists() ? snapshot.val() : undefined;
	},

	// Получение всех книг
	async getAllBooks(): Promise<IBook[]> {
		const db = await this.getDb();
		const { get, ref } = await import("firebase/database");

		const snapshot = await get(ref(db, "books"));

		if (!snapshot.exists()) return [];

		return Object.keys(snapshot.val()).map((key) => ({
			...snapshot.val()[key],
			id: key,
		}));
	},

	// Получение книг которые добавил пользователь
	async getUserBooks(userId: string): Promise<string[]> {
		const db = await this.getDb();
		const { get, ref } = await import("firebase/database");

		const snapshot = await get(ref(db, `user_books/${userId}`));
		return snapshot.exists() ? Object.keys(snapshot.val()) : [];
	},
};
