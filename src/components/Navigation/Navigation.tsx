import { Link, NavLink } from "react-router-dom";
import styles from "./navigation.module.scss";
import clsx from "clsx";
import { Book, BookHeart, BookPlus, LibraryBig, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Button from "../Button/Button";

function Navigation() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [userName, setUserName] = useState<string | null>(null);

	async function getUser() {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const docRef = doc(firestore, "User", user.uid);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					const userData = docSnap.data();
					setUserName(userData.name);
				} else {
					console.error("Пользователь не найден.");
				}
			} else {
				console.error("Пользователь не аутентифицирован.");
			}
		});
	}

	async function handlerSignout() {
		const res = confirm("Вы действительно хотите выйти из личного кабинета?");

		if (res) {
			try {
				await auth.signOut();
				setUserName(null);
			} catch (error) {
				console.log(error);
			}
		}

		return;
	}

	useEffect(() => {
		getUser();
	}, []);

	return (
		<>
			<div className={styles["navigation"]}>
				{userName ? (
					<Button title="Меню" isPrimary onClick={handlerSignout}>{userName}</Button>
				) : (
					<Link className={styles["auth"]} to="/signin">
						Войти
					</Link>
				)}
				<Button
					isSvg
					onClick={() => setIsModalOpen(!isModalOpen)}
					isSecond
				>
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
						to="/"
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
						to="/add-book"
						end
					>
						<BookPlus size={18} />
						Добавить книгу
					</NavLink>
					<NavLink
						onClick={() => setIsModalOpen(!isModalOpen)}
						className={({ isActive }) =>
							clsx(styles["link"], isActive && styles["active"])
						}
						to="/my-books"
					>
						<Book size={18} />
						Мои книги
					</NavLink>
					<NavLink
						onClick={() => setIsModalOpen(!isModalOpen)}
						className={({ isActive }) =>
							clsx(styles["link"], isActive && styles["active"])
						}
						to="/favorite"
					>
						<BookHeart size={18} />
						Избранное
					</NavLink>
				</nav>
			)}
		</>
	);
}

export default Navigation;
