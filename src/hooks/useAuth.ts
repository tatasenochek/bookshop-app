import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";
import { subscribeToAuthChanges } from "../store/slice/userSlice";

export const useAuth = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const unsubscribe = dispatch(subscribeToAuthChanges());
		return () => unsubscribe();
	}, [dispatch]);
};
