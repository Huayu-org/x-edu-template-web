import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [react(), tailwindcss(), basicSsl(), Inspect()],
	server: {
		open: true,
		port: 8080,
	},
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	define: {
		'process.env': {
			_global_env: mode,
		},
	},
	css: {
		plugins: [autoprefixer()],
	},
	optimizeDeps: {
		include: ['react', 'react-dom', 'react-router'],
	},
}))
