import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAuthStatus } from "../../store/slice/userSlice";

function RequireAuth({ children }: { children: ReactNode }) {
	const userAuthStatus = useSelector(selectUserAuthStatus)

	if (userAuthStatus === false) {
		return <Navigate to="/signin" replace />;
	}

	return children;
}

export default RequireAuth;
