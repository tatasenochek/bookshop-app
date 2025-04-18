import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/bookshop-app",
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					toastify: ["react-toastify"],
					firebase: [
						"firebase/app",
						"firebase/auth",
						"firebase/firestore",
						"firebase/database",
					],
					react: ["react", "react-dom", "react-router-dom"],
					lucide: ["lucide-react"],
					redux: ["@reduxjs/toolkit", "react-redux"],
					clsx: ["clsx"]
				},
			},
		},
	},
});
