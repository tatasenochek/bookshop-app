import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQuery";

export const booksApi = createApi({
	reducerPath: "booksApi",
	baseQuery: baseQuery,
	tagTypes: ["Book"],
	endpoints: () => ({})
});
