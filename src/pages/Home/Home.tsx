import CardBookList from "../../components/CardBookList/CardBookList";
import styles from "./home.module.scss";
import Button from "../../components/Button/Button";
import { BarLoader } from "react-spinners";
import { CSSProperties, useState } from "react";
import { useGetAllBooksQuery } from "../../store/services/bookQueries";
import Pagination from "../../components/Pagination/Pagination";

const override: CSSProperties = {
	display: "block",
	margin: "150px auto",
};

function Home() {
	const [page, setPage] = useState(1);
	const limit = 3;

	const {
		data: booksList,
		isLoading,
		isError,
		refetch,
	} = useGetAllBooksQuery({ page, limit });

	const totalPages = Math.ceil((booksList?.count || 0) / limit);

	function handleNextPage() {
		if (page < totalPages) {
			setPage((prev) => prev + 1);
		}
	}

	function handlePrevPage() {
		if (page !== 1) {
			setPage((prev) => prev - 1);
		}
	}

	function handleCurrentPage(index: number) {
		const page = index + 1;
		setPage(page);
	}

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
				<Button isPrimary onClick={refetch}>
					Попробовать снова
				</Button>
			</div>
		);
	}

	return (
		<div className={styles["home"]}>
			{booksList && booksList.count > 0 ? (
				<CardBookList booksList={booksList.data} />
			) : (
				<p>Книги не найдены</p>
			)}
			<Pagination
				page={page}
				totalPages={totalPages}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handleCurrentPage={handleCurrentPage}
			/>
		</div>
	);
}

export default Home;
