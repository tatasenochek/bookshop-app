import CardBookList from "../../components/CardBookList/CardBookList";
import styles from "./home.module.scss";
import Button from "../../components/Button/Button";
import { BarLoader } from "react-spinners";
import { CSSProperties } from "react";
import { useGetAllBooksQuery } from "../../store/services/bookQueries";

const override: CSSProperties = {
	display: "block",
	margin: "150px auto",
};

function Home() {
	const {
		data: booksList,
		isLoading,
		isError,
		refetch,
	} = useGetAllBooksQuery();
	
	if (isLoading) {
		return (
			<div className={styles["home"]}>
				<BarLoader
					color="#1e4666"
					loading={isLoading}
					aria-label="Спинер загрузки"
					data-testid="loader"
					cssOverride={override}
				/>
			</div>
		);
	} 

	if (isError) {
		return (
			<div className={styles["home-error"]}>
				<p>Не удалось загрузить книги</p>
				<Button isPrimary onClick={refetch}>Попробовать снова</Button>
			</div>
		);
	}

	return (
		<div className={styles["home"]}>
			{booksList && booksList.length > 0 ? (
				<CardBookList booksList={booksList} />
			) : (
				<p>Книги не найдены</p>
			)}
		</div>
	);
}

export default Home;
