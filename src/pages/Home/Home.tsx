import CardBookList from "../../components/CardBookList/CardBookList";
import styles from "./home.module.scss";
import Button from "../../components/Button/Button";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useGetAllBooksQuery } from "../../store/services/bookQueries";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
import { useSelector } from "react-redux";
import { selectUserUid } from "../../store/slice/userSlice";
import { limit } from "../../const/const";
import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";

function Home() {
	const userId = useSelector(selectUserUid);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState<string>("");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [onlyMyBooks, setOnlyMyBooks] = useState(false);

	const {
		data: booksList,
		isLoading,
		isError,
		refetch,
	} = useGetAllBooksQuery(
		{
			page,
			limit,
			search: searchQuery,
			userId: onlyMyBooks && userId ? userId : undefined,
		}
	);

	const totalPages = Math.ceil((booksList?.count || 0) / limit);

	function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	function handleSearch(e: MouseEvent) {
		e.preventDefault();
		setPage(1);
		setSearchQuery(search);
		refetch();
		setSearch("");
	}

	if (isLoading) {
		return <Loader/>;
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
			<div className={styles["action"]}>
				<Search
					search={search}
					handleChangeSearch={handleChangeSearch}
					handleSearch={handleSearch}
				/>
				<Input
					label="Только мои"
					type="checkbox"
					isCheckbox
					checked={onlyMyBooks}
					onChange={() => {
						setOnlyMyBooks(!onlyMyBooks);
						setPage(1);
					}}
				/>
			</div>
			{booksList && booksList.count > 0 ? (
				<CardBookList booksList={booksList.data} />
			) : (
				<p>Книги не найдены</p>
			)}
			<Pagination
				page={page}
				totalPages={totalPages}
				onPageChange={(page) => setPage(page)}
			/>
		</div>
	);
}

export default Home;
