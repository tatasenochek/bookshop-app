import styles from "./search.module.scss";
import { SearchIcon, X } from "lucide-react";

function Search() {
	return (
		<label className={styles["search"]} htmlFor="search">
			<SearchIcon className={styles["icon-search"]} size={18} />
			<input className={styles["input"]} id="search" type="text" />
			<X className={styles["icon-close"]} size={18} />
		</label>
	);
}

export default Search;
