import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export function LayoutMain() {
	return (
		<>
			<Header />
			<Outlet></Outlet>
		</>
	);
}
