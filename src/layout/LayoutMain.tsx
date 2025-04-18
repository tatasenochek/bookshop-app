import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

function LayoutMain() {
	return (
		<>
			<Header />
			<Outlet></Outlet>
		</>
	);
}

export default LayoutMain;