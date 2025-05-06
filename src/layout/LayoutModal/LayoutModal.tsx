import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { ComponentType, ReactNode, Suspense } from "react";
import { ROUTES } from "../../const/const";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

function LayoutModal({
	title,
	children,
	Component,
}: {
	title: string;
	children: ReactNode;
	Component: ComponentType;
}) {
	const navigate = useNavigate();
	const location = useLocation();
	const backgroundPath = location.state?.backgroundPath || ROUTES.HOME;

	function handleClose() {
		setTimeout(() => {
			navigate(backgroundPath, { replace: true });
		}, 300);
	}

	return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<Component/>
			<Modal isOpen={true} onClose={handleClose} title={title}>
				<Suspense fallback={<>Загружаем страницу...</>}>{children}</Suspense>
			</Modal>
		</ErrorBoundary>
	);
}

export default LayoutModal;
