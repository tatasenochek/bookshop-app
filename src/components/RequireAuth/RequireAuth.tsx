import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAythStatus } from "../../store/slice/userSlice";

function RequireAuth({ children }: { children: ReactNode }) {
	const userAythStatus = useSelector(selectUserAythStatus)

	if (userAythStatus === false) {
		return <Navigate to="/signin" replace />;
	}

	return children;
}

export default RequireAuth;
