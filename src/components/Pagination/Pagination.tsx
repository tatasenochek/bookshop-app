import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./pagination.module.scss";
import Button from "../Button/Button";
import clsx from "clsx";

interface IPaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

function Pagination({
	page,
	totalPages,
	onPageChange,
}: IPaginationProps) {
	function handleNextPage() {
		if (page < totalPages) {
			onPageChange(page + 1);
		}
	}

	function handlePrevPage() {
		if (page !== 1) {
			onPageChange(page - 1);
		}
	}

	function handleCurrentPage(index: number) {
		const page = index + 1;
		onPageChange(page);
	}

	return (
		<div className={styles["pagination"]}>
			<div className={styles["info"]}>
				Показано <b>{page}</b> из <b>{totalPages}</b>
			</div>
			<div className={styles["action"]}>
				<Button
					aria-label="Предыдущая страница"
					isSecond
					isSvg
					disabled={page == 1}
					onClick={handlePrevPage}
				>
					<ChevronLeft />
				</Button>
				<ul className={styles["page-list"]}>
					{[...Array(totalPages)].map((_, index) => (
						<li
							className={clsx(page === index + 1 && styles["active"])}
							key={index}
							aria-label={`Страница ${index + 1}`}
							onClick={() => handleCurrentPage(index)}
						>
							{index + 1}
						</li>
					))}
				</ul>
				<Button
					isSecond
					isSvg
					disabled={page >= totalPages}
					onClick={handleNextPage}
					aria-label="Следующая страница"
				>
					<ChevronRight />
				</Button>
			</div>
		</div>
	);
}

export default Pagination;
