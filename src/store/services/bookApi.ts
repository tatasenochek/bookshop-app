import { createApi } from "@reduxjs/toolkit/query/react";


export const booksApi = createApi({
	reducerPath: "booksApi",
	baseQuery: async () => ({ data: null }),
	tagTypes: ["Book"],
	endpoints: () => ({})
});

