import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutMain from "./layout/LayoutMain";
import Home from "./pages/Home/Home";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "./const/const";
import { Suspense } from "react";
import { useAuth } from "./hooks/useAuth";
import { lazy } from "react";
import LayoutModal from "./layout/LayoutModal/LayoutModal";

export const Signin = lazy(() => import("./pages/Signin/Signin"));
export const Signup = lazy(() => import("./pages/Signup/Signup"));
export const AddBook = lazy(() => import("./pages/AddBook/AddBook"));
export const Book = lazy(() => import("./pages/Book/Book"));
export const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const router = createBrowserRouter(
	[
		{
			path: ROUTES.HOME,
			element: <LayoutMain />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: ROUTES.ADD_BOOK,
					element: (
						<RequireAuth>
							<Home />
							<LayoutModal title="">
								<Suspense fallback={<>Загружаем страницу...</>}>
									<AddBook />
								</Suspense>
							</LayoutModal>
						</RequireAuth>
					),
				},
				{
					path: ROUTES.SIGNIN,
					element: (
						<>
							<Home />
							<LayoutModal title="">
								<Suspense fallback={<>Загружаем страницу...</>}>
									<Signin />
								</Suspense>
							</LayoutModal>
						</>
					),
				},
				{
					path: ROUTES.SIGNUP,
					element: (
						<>
							<Home />
							<LayoutModal title="">
								<Suspense fallback={<>Загружаем страницу...</>}>
									<Signup />
								</Suspense>
							</LayoutModal>
						</>
					),
				},
				{
					path: `${ROUTES.BOOK}/:id`,
					element: (
						<>
							<Home />
							<LayoutModal title="Подробнее">
								<Suspense fallback={<>Загружаем...</>}>
									<Book />
								</Suspense>
							</LayoutModal>
						</>
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

	return <RouterProvider router={router} />;
}

export default App;
