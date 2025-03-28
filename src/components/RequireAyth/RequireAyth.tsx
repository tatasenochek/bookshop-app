import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/config";

export function RequireAyth({ children }: { children: ReactNode }) {
	const [isUserSignin, setIsUserSignin] = useState<boolean>(true);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsUserSignin(true);
			} else {
				setIsUserSignin(false);
			}
		});
	}, []);

	if (isUserSignin === false) {
		return <Navigate to="/signin" replace />;
	}

	return children;
}
