import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutMain from "./layout/LayoutMain";
import Home from "./pages/Home/Home";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "./const/const";
import { subscribeToAuthChanges } from "./store/slice/userSlice";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";

const Signin = lazy(() => import("./pages/Signin/Signin"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const AddBook = lazy(() => import("./pages/AddBook/AddBook"));
const MyBooks = lazy(() => import("./pages/MyBooks/MyBooks"));
const Book = lazy(() => import("./pages/Book/Book"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const ToastContainer = lazy(() =>
	import("react-toastify").then((module) => ({
		default: module.ToastContainer,
	}))
);

const router = createBrowserRouter(
	[
		{
			path: ROUTES.HOME,
			element: (
				<>
					<LayoutMain />
					<ToastContainer position="top-right" autoClose={3000} theme="light" />
				</>
			),
			children: [
				{
					path: ROUTES.HOME,
					element: (
						<Suspense fallback={<>Загружаем данные о книгах...</>}>
							<Home />
						</Suspense>
					),
				},
				{
					path: ROUTES.ADD_BOOK,
					element: (
						<RequireAuth>
							<Suspense fallback={<>Загружаем страницу...</>}>
								<AddBook />
							</Suspense>
						</RequireAuth>
					),
				},
				{
					path: ROUTES.MY_BOOKS,
					element: (
						<RequireAuth>
							<Suspense fallback={<>Загружаем данные о книгах...</>}>
								<MyBooks />
							</Suspense>
						</RequireAuth>
					),
				},
				{
					path: ROUTES.SIGNIN,
					element: (
						<Suspense fallback={<>Загружаем страницу...</>}>
							<Signin />
						</Suspense>
					),
				},
				{
					path: ROUTES.SIGNUP,
					element: (
						<Suspense fallback={<>Загружаем страницу...</>}>
							<Signup />
						</Suspense>
					),
				},
				{
					path: ROUTES.BOOK,
					element: (
						<Suspense fallback={<>Загружаем данные о книге...</>}>
							<Book />
						</Suspense>
					),
				},
				{
					path: ROUTES.NOT_FOUND,
					element: <NotFound />,
				},
			],
		},
	],
	{
		basename: "/bookshop-app",
	}
);

function App() {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const unsubscribe = dispatch(subscribeToAuthChanges());

		return () => unsubscribe();
	}, [dispatch]);

	useEffect(() => {
		import("./firebase/config");
	}, []);


	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
