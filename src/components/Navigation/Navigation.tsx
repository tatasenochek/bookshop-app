import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./navigation.module.scss";
import clsx from "clsx";
import { BookPlus, LibraryBig, Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { selectUserName } from "../../store/slice/userSlice";
import { ROUTES } from "../../const/const";
import { useSignOutMutation } from "../../store/services/authApi";
import { toast } from "react-toastify";

function Navigation() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const userName = useSelector(selectUserName);
	const location = useLocation();
	const navigate = useNavigate();
	const [signOut, { isLoading }] = useSignOutMutation();

	async function handlerSignout() {
		const res = confirm("Вы действительно хотите выйти?");
		if (res) {
			try {
				await signOut().unwrap()
				toast.success("Вы успешно вышли из системы");
				navigate(ROUTES.HOME);
			} catch (error) {
				console.error(error);
			}
		}
	}

	return (
		<>
			<div className={styles["navigation"]}>
				{userName ? (
					<Button title="Меню" isPrimary onClick={handlerSignout}>
						{isLoading ? "Выход..." : userName}
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
				<Button
					aria-label={isModalOpen ? "Закрыть меню" : "Открыть меню"}
					isSvg
					onClick={() => setIsModalOpen(!isModalOpen)}
					isSecond
				>
					{isModalOpen === false ? <Menu /> : <X />}
				</Button>
			</div>
			{isModalOpen === true && (
				<nav className={styles["menu"]} aria-label="Основное меню">
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
