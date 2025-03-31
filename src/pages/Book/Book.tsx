import { useParams } from "react-router-dom";
import styles from "./book.module.scss";

function Book() {
	const { id } = useParams()
	
	return <div className={styles["book"]}>Book { id }</div>;
}

export default Book;
