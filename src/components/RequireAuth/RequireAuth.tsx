import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../const/const";
import { selectUserUid } from "../../store/slice/userSlice";

function RequireAuth({ children }: { children: ReactNode }) {
	const userUid = useSelector(selectUserUid);
	const location = useLocation();


	if (!userUid) {
		return (
			<Navigate
				to={`${ROUTES.SIGNIN}`}
				state={{
					backgroundPath: location,
					modalOpen: true,
				}}
				replace
			/>
		);
	}

	return children;
}

export default RequireAuth;
