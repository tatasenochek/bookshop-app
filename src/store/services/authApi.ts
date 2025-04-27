import { createApi } from "@reduxjs/toolkit/query/react";
import supabase from "../../supabase/config";
import { Session, User } from "@supabase/supabase-js";

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
	baseQuery: async () => ({ data: null }),
	endpoints: (builder) => ({
		// регистрация
		signUp: builder.mutation<IAuthResponse, IAuth>({
			async queryFn({ email, password, name }: IAuth) {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						data: {
							name,
						},
					},
				});
				if (error)
					return { error: { status: error.status, data: error.message } };
				return { data };
			},
		}),

		// авторизация
		signIn: builder.mutation<IAuthResponse, IAuth>({
			async queryFn({ email, password }: IAuth) {
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password,
				});

				if (error)
					return { error: { status: error.status, data: error.message } };
				return { data };
			},
		}),

		// выход
		signOut: builder.mutation<void, void>({
			async queryFn() {
				const { error } = await supabase.auth.signOut();

				if (error) {
					return { error: { status: error.status, data: error.message } };
				} else {
					return { data: undefined };
				}
			},
		}),

    // получение сессии
		getSession: builder.query({
			async queryFn() {
				const { data, error } = await supabase.auth.getSession();

				if (error) {
					return { error: { status: error.status, data: error.message } };
				}
				return { data };
			},
		}),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useSignOutMutation,
	useGetSessionQuery,
} = authApi;
