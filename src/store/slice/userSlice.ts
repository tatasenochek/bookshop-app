import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import { AppDispatch, RootState } from "../store";
import { Unsubscribe } from "firebase/auth";

interface IUser {
	userName: string | null;
	userId: string | null;
	userAythStatus: boolean;
}

interface IUserState extends IUser {
	isLoading: boolean;
	error: string | null;
}

const initialState: IUserState = {
	userName: null,
	userId: null,
	userAythStatus: false,
	isLoading: false,
	error: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.userId = action.payload.userId;
			state.userName = action.payload.userName;
			state.userAythStatus = true;
			state.isLoading = false;
			state.error = null;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		signOut: (state) => {
			state.userId = null;
			state.userName = null;
			state.userAythStatus = false;
			state.isLoading = false;
			state.error = null;
		},
	},
});

export const { setUser, signOut, setLoading, setError } = userSlice.actions;

export const subscribeToAuthChanges =
	() =>
	(dispatch: AppDispatch): Unsubscribe => {
		dispatch(setLoading(true));

		const unsubscribe = auth.onAuthStateChanged(
			(user) => {
				if (user) {
					dispatch(
						setUser({
							userName: user.displayName,
							userId: user.uid,
							userAythStatus: true,
						})
					);
				} else {
					dispatch(signOut());
				}
			},
			(error) => {
				dispatch(setError(error.message));
				dispatch(setLoading(false));
			}
		);

		return unsubscribe;
	};

export default userSlice.reducer;
export const selectUserName = (state: RootState) => state.user.userName;
export const selectUserId = (state: RootState) => state.user.userId;
export const selectUserAythStatus = (state: RootState) => state.user.userAythStatus;