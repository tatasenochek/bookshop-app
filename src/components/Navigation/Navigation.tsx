import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./navigation.module.scss";
import clsx from "clsx";
import { BookPlus, LibraryBig, Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { selectUserName } from "../../store/slice/userSlice";
import { useAuthActions } from "../../hooks/useAuthActions";
import { ROUTES } from "../../const/const";

function Navigation() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const userName = useSelector(selectUserName);
	const { handlerSignout } = useAuthActions();
	const location = useLocation();

	return (
		<>
			<div className={styles["navigation"]}>
				{userName ? (
					<Button title="Меню" isPrimary onClick={handlerSignout}>
						{userName}
					</Button>
				) : (
					<Link
						className={styles["auth"]}
						state={{ backgroundPath: location }}
						to={`${ROUTES.SIGNIN}`}
					>
						Войти
					</Link>
				)}
				<Button isSvg onClick={() => setIsModalOpen(!isModalOpen)} isSecond>
					{isModalOpen === false ? <Menu /> : <X />}
				</Button>
			</div>
			{isModalOpen === true && (
				<nav className={styles["menu"]}>
					<NavLink
						onClick={() => setIsModalOpen(!isModalOpen)}
						className={({ isActive }) =>
							clsx(styles["link"], isActive && styles["active"])
						}
						to={`${ROUTES.HOME}`}
						end
					>
						<LibraryBig size={18} />
						Главная
					</NavLink>
					<NavLink
						onClick={() => setIsModalOpen(!isModalOpen)}
						className={({ isActive }) =>
							clsx(styles["link"], isActive && styles["active"])
						}
						to={`${ROUTES.ADD_BOOK}`}
						state={{ backgroundPath: location }}
						end
					>
						<BookPlus size={18} />
						Добавить книгу
					</NavLink>
				</nav>
			)}
		</>
	);
}

export default Navigation;
