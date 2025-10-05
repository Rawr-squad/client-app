import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
	},
	build: {
		outDir: 'dist',
		// Important for Electron: don't use absolute paths
		assetsDir: './',
		rollupOptions: {
			output: {
				format: 'es', // Electron works well with ES modules
			},
		},
	},
	// Fix for Electron path resolution
	base: './',
});

