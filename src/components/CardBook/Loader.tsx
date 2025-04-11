import ContentLoader from "react-content-loader";

const MyLoader = () => (
	<ContentLoader
		speed={2}
		width={250}
		height={500}
		viewBox="0 0 250 500"
		backgroundColor="#c2c2c2"
		foregroundColor="#ecebeb"
	>
		<rect x="10" y="10" rx="3" ry="3" width="212" height="320" />
		<rect x="10" y="358" rx="0" ry="0" width="212" height="18" />
		<rect x="10" y="388" rx="0" ry="0" width="180" height="18" />
		<rect x="182" y="430" rx="0" ry="0" width="40" height="40" />
		<rect x="10" y="430" rx="0" ry="0" width="160" height="40" />
	</ContentLoader>
);

export default MyLoader;
