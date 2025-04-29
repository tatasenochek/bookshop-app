import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./pagination.module.scss";
import Button from "../Button/Button";
import clsx from "clsx";

interface IPaginationProps {
	page: number;
	totalPages: number;
	handleNextPage: () => void;
	handlePrevPage: () => void;
	handleCurrentPage: (index: number) => void;
}

function Pagination({
	page,
	totalPages,
	handleNextPage,
	handlePrevPage,
	handleCurrentPage,
}: IPaginationProps) {
	return (
		<div className={styles["pagination"]}>
			<div className={styles["info"]}>
				Показано <b>{page}</b> из <b>{totalPages}</b>
			</div>
			<div className={styles["action"]}>
				<Button isSecond isSvg disabled={page == 1} onClick={handlePrevPage}>
					<ChevronLeft />
				</Button>
				<ul className={styles["page-list"]}>
					{[...Array(totalPages)].map((_, index) => (
						<li
							className={clsx(page === index + 1 && styles["active"])}
							key={index}
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
				>
					<ChevronRight />
				</Button>
			</div>
		</div>
	);
}

export default Pagination;
