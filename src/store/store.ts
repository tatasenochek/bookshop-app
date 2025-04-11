import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import bookReducer from "./slice/bookSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		book: bookReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
