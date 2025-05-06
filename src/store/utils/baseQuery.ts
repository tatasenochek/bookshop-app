import { PostgrestError, AuthError } from "@supabase/supabase-js";

type BaseQueryResponse<T> = {
	data?: T;
	error?: PostgrestError | AuthError | null;
	count?: number | null;
};

type BaseQueryError = {
	status: number;
	data: string;
};

export async function baseQuery<T>(arg: {
	queryFn: () => Promise<BaseQueryResponse<T>>;
}): Promise<{ data: T } | { error: BaseQueryError }> {
	try {
		const response = await arg.queryFn();

		if (response.error) {
			return {
				error: {
					status: Number(response.error.code) || 400,
					data: response.error.message || "Произошла ошибка",
				},
			};
		}

		if (!response.data) {
			return {
				error: {
					status: 404,
					data: "Данные не найдены",
				},
			};
		}

		return { data: response.data };
	} catch (error) {
		const err = error as Error;
		return {
			error: {
				status: 500,
				data: err.message || "Неизвестная ошибка",
			},
		};
	}
}
