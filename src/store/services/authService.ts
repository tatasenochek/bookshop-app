// import { onAuthStateChanged, Unsubscribe, User } from "firebase/auth";

// export const authService = {
// 	// Инициализация
// 	async getAuthentication() {
// 		const { getAuth } = await import("firebase/auth");
// 		return getAuth();
// 	},

// 	// Вход
// 	async signIn(email: string, password: string) {
// 		const auth = await this.getAuthentication();
// 		const { signInWithEmailAndPassword } = await import("firebase/auth");
// 		return signInWithEmailAndPassword(auth, email, password);
// 	},

// 	// Регистрация
// 	async signUp(email: string, password: string, name: string) {
// 		const auth = await this.getAuthentication();
// 		const { createUserWithEmailAndPassword, updateProfile } = await import(
// 			"firebase/auth"
// 		);
// 		const res = await createUserWithEmailAndPassword(auth, email, password);
// 		await updateProfile(res.user, {
// 			displayName: name,
// 		});
// 		return res.user;
// 	},

// 	// Выход
// 	async signOut() {
// 		const auth = await this.getAuthentication();
// 		await auth.signOut();
// 	},

// 	// Подписка
// 	async subscribeToAuthChanges(
// 		callback: (user: User | null) => void): Unsubscribe {
// 		return onAuthStateChanged(await this.getAuthentication(), callback);
// 	},
// };
