import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUserState {
	userUid: string | null;
	userEmail: string | null;
	userName: string | null;
	isAuth: boolean;
}

const initialState: IUserState = {
	userUid: null,
	userEmail: null,
	userName: null,
	isAuth: false
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUserState>) => {
			state.userUid = action.payload.userUid;
			state.userEmail = action.payload.userEmail;
			state.userName = action.payload.userName;
			state.isAuth = true
		},
		clearUser: (state) => {
			state.userUid = null;
			state.userEmail = null;
			state.userName = null;
			state.isAuth = false;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUserName = (state: RootState) => state.user.userName;
export const selectUserUid = (state: RootState) => state.user.userUid;
export const selectUserIsAuth = (state: RootState) => state.user.isAuth;
