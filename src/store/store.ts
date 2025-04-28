import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import { authApi } from "./services/authApi";
import { booksApi } from "./services/bookApi";

export const store = configureStore({
	reducer: {
		user: userReducer,
		[authApi.reducerPath]: authApi.reducer,
		[booksApi.reducerPath]: booksApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware, booksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
