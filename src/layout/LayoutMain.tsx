import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

function LayoutMain() {
	const ToastContainer = lazy(() =>
		import("react-toastify").then((module) => ({
			default: module.ToastContainer,
		}))
	);
	
	return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<Header />
			<Outlet />
			<Suspense fallback={null}>
				<ToastContainer position="top-right" autoClose={3000} theme="light" />
			</Suspense>
		</ErrorBoundary>
	);
}

export default LayoutMain;
