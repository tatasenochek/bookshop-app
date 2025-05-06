import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import LayoutMain from "./layout/LayoutMain";
import Home from "./pages/Home/Home";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "./const/const";
import { useAuth } from "./hooks/useAuth";
import { lazy } from "react";
import LayoutModal from "./layout/LayoutModal/LayoutModal";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

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
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: ROUTES.ADD_BOOK,
					element: (
						<RequireAuth>
							<LayoutModal title="" Component={Home}>
								<AddBook />
							</LayoutModal>
						</RequireAuth>
					),
				},
				{
					path: ROUTES.SIGNIN,
					element: (
						<LayoutModal title="" Component={Home}>
							<Signin />
						</LayoutModal>
					),
				},
				{
					path: ROUTES.SIGNUP,
					element: (
						<LayoutModal title="" Component={Home}>
							<Signup />
						</LayoutModal>
					),
				},
				{
					path: `${ROUTES.BOOK}/:id`,
					element: (
						<LayoutModal title="Подробнее" Component={Home}>
							<Book />
						</LayoutModal>
					),
				},
				{
					path: ROUTES.NOT_FOUND,
					element: <NotFound />,
				},
			],
		},
		{
			path: "*",
			element: <Navigate to={ROUTES.NOT_FOUND} replace />,
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
