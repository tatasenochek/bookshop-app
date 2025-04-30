import { ChangeEvent, MouseEvent } from "react";
import styles from "./search.module.scss";
import { SearchIcon } from "lucide-react";

interface ISearchProps {
	search: string;
	handleChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSearch: (e: MouseEvent) => void;
}

function Search({ search, handleChangeSearch, handleSearch }: ISearchProps) {
	return (
		<div className={styles["search"]}>
			<SearchIcon size={16} className={styles["search-icon"]} />
			<input
				type="text"
				placeholder="Поиск.."
				className={styles["search-input"]}
				value={search}
				onChange={handleChangeSearch}
			/>
			<button aria-label="Найти" onClick={handleSearch}>
				Найти
			</button>
		</div>
	);
}

export default Search;
