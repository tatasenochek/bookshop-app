import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";
import { clearUser, setUser } from "../store/slice/userSlice";
import supabase from "../supabase/config";

export const useAuth = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const getCurrentSession = async () => {
			const { data: { session } } = await supabase.auth.getSession();

			if (session?.user) {
				dispatch(
					setUser({
						userUid: session.user.id,
						userEmail: session.user.email || "",
						userName: session.user.user_metadata.name || "",
						isAuth: true,
					})
				);
			}
		};

		getCurrentSession();

		const { data: authListner } = supabase.auth.onAuthStateChange(
			async (_event, session) => {
				if (session?.user) {
					dispatch(
						setUser({
							userUid: session.user.id,
							userEmail: session.user.email || "",
							userName: session.user.user_metadata.name || "",
							isAuth: true,
						})
					);
				} else {
					dispatch(clearUser());
				}
			}
		);

		return () => {
			authListner.subscription.unsubscribe();
		};
	}, [dispatch]);
};
