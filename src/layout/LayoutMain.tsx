import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { lazy, Suspense } from "react";

function LayoutMain() {
	const ToastContainer = lazy(() =>
		import("react-toastify").then((module) => ({
			default: module.ToastContainer,
		}))
	);
	
	return (
		<>
			<Header />
			<Outlet></Outlet>
			<Suspense fallback={null}>
				<ToastContainer position="top-right" autoClose={3000} theme="light" />
			</Suspense>
		</>
	);
}

export default LayoutMain;
