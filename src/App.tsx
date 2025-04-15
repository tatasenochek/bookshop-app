import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutMain } from "./layout/LayoutMain";
import Home from "./pages/Home/Home";
import AddBook from "./pages/AddBook/AddBook";
import MyBooks from "./pages/MyBooks/MyBooks";
import NotFound from "./pages/NotFound/NotFound";
import Book from "./pages/Book/Book";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "./const/const";
import { subscribeToAuthChanges } from "./store/slice/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";

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
						<RequireAuth>
							<AddBook />
						</RequireAuth>
					),
				},
				{
					path: ROUTES.MY_BOOKS,
					element: (
						<RequireAuth>
							<MyBooks />
						</RequireAuth>
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
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const unsubscribe = dispatch(subscribeToAuthChanges());
		
		return () => unsubscribe();
	}, [dispatch]);

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
