import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutMain from "./layout/LayoutMain";
import Home from "./pages/Home/Home";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "./const/const";
import { Suspense } from "react";
import { useAuth } from "./hooks/useAuth";
import {
	AddBook,
	Book,
	MyBooks,
	NotFound,
	Signin,
	Signup,
} from "./routes/LazyComponents";

const router = createBrowserRouter(
	[
		{
			path: ROUTES.HOME,
			element: <LayoutMain />,
			children: [
				{
					path: ROUTES.HOME,
					element: <Home />,
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
	useAuth();

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
