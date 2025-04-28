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
				manualChunks: {
					react: ["react", "react-dom", "react-router-dom"],
					redux: ["@reduxjs/toolkit", "react-redux"],
					supabase: ["@supabase/supabase-js"],
					ui: ["lucide-react", "clsx"],
					toastify: ["react-toastify"],
				},
			},
		},
	},
});
