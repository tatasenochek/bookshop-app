import { lazy } from "react";

export const Signin = lazy(() => import("../pages/Signin/Signin"));
export const Signup = lazy(() => import("../pages/Signup/Signup"));
export const AddBook = lazy(() => import("../pages/AddBook/AddBook"));
export const MyBooks = lazy(() => import("../pages/MyBooks/MyBooks"));
export const Book = lazy(() => import("../pages/Book/Book"));
export const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
