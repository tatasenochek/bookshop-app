import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import bookReducer from "./slice/bookSlice";
import { authApi } from "./services/authApi";

export const store = configureStore({
	reducer: {
		user: userReducer,
		[authApi.reducerPath]: authApi.reducer,
		book: bookReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
