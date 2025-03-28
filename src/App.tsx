import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutMain } from "./layout/LayoutMain";
import Home from "./pages/Home/Home";
import AddBook from "./pages/AddBook/AddBook";
import MyBooks from "./pages/MyBooks/MyBooks";
import Favorite from "./pages/Favorite/Favorite";
import NotFound from "./pages/NotFound/NotFound";
import Book from "./pages/Book/Book";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "./const/const";
import { RequireAyth } from "./components/RequireAyth/RequireAyth";

const router = createBrowserRouter(
	[
		{
			path: ROUTES.HOME,
			element: (
				<>
					<LayoutMain />
					<ToastContainer
						position="top-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
				</>
			),
			children: [
				{
					path: ROUTES.HOME,
					element: <Home />,
				},
				{
					path: ROUTES.ADD_BOOK,
					element: (
						<RequireAyth>
							<AddBook />
						</RequireAyth>
					),
				},
				{
					path: ROUTES.MY_BOOKS,
					element: (
						<RequireAyth>
							<MyBooks />
						</RequireAyth>
					),
				},
				{
					path: ROUTES.FAVORITE,
					element: (
						<RequireAyth>
							<Favorite />
						</RequireAyth>
					),
				},
				{
					path: ROUTES.SIGNIN,
					element: <Signin />,
				},
				{
					path: ROUTES.SIGNUP,
					element: <Signup />,
				},
				{
					path: ROUTES.BOOK,
					element: <Book />,
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
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
