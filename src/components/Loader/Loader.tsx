import { CSSProperties } from "react";
import { BarLoader } from "react-spinners";
import styles from "./loader.module.scss";

const override: CSSProperties = {
	display: "block",
	marginTop: "50px",
};

function Loader() {
  return (
		<div className={styles["loader"]}>
			<p>Загружаем данные..</p>
			<BarLoader
				color="#1e4666"
				aria-label="Спинер загрузки"
				data-testid="loader"
				cssOverride={override}
			/>
		</div>
	);
}

export default Loader;
