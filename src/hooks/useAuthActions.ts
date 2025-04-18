import { useDispatch } from "react-redux";
import { signOut } from "../store/slice/userSlice";
import { auth } from "../firebase/config";

export function useAuthActions() {
	const dispatch = useDispatch();

  const handlerSignout = async () => {
		const res = confirm("Вы действительно хотите выйти?");
		if (res) {
      try {
				await auth.signOut();
				dispatch(signOut());
			} catch (error) {
				console.error(error);
			}
		}
	};

	return { handlerSignout };
}
