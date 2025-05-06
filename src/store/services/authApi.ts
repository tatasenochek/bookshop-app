import { createApi } from "@reduxjs/toolkit/query/react";
import supabase from "../../supabase/config";
import { Session, User } from "@supabase/supabase-js";
import { baseQuery } from "../utils/baseQuery";

interface IAuth {
	email: string;
	password: string;
	name?: string;
}

interface IAuthResponse {
	user: User | null;
	session: Session | null;
}

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		// регистрация
		signUp: builder.mutation<IAuthResponse, IAuth>({
			query: ({ email, password, name }) => ({
				queryFn: async () =>
					supabase.auth.signUp({
						email,
						password,
						options: {
							data: { name },
						},
					}),
			}),
		}),

		// авторизация
		signIn: builder.mutation<IAuthResponse, IAuth>({
			query: ({ email, password }) => ({
				queryFn: async () =>
					supabase.auth.signInWithPassword({
						email,
						password,
					}),
			}),
		}),

		// выход
		signOut: builder.mutation<void, void>({
			query: () => ({
				queryFn: async () => supabase.auth.signOut(),
			}),
		}),

		// получение сессии
		getSession: builder.query({
			query: () => ({
				queryFn: async () => supabase.auth.getSession(),
			}),
		}),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useSignOutMutation,
	useGetSessionQuery,
} = authApi;
