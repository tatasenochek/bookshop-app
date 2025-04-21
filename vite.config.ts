import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react()],
	base: "/bookshop-app",
	css: {
		modules: {
			localsConvention: "camelCase",
		},
	},
	build: {
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					if (
						id.includes("firebase/app") ||
						id.includes("firebase/auth") ||
						id.includes("firebase/firestore")
					) {
						return "firebase";
					}
					if (id.includes("firebase/database")) {
						return "firebase-database";
					}

					if (id.includes("react-dom") || id.includes("react-router")) {
						return "react-core";
					}

					if (id.includes("redux")) {
						return "state-management";
					}

					if (
						id.includes("lucide") ||
						id.includes("clsx") ||
						id.includes("toastify")
					) {
						return "ui-libs";
					}

					if (id.includes("node_modules")) {
						return "vendor";
					}

					if (id.includes("/src/components/")) {
						return "components";
					}
					if (id.includes("/src/pages/")) {
						return "pages";
					}
				},
			},
		},
	},
});
