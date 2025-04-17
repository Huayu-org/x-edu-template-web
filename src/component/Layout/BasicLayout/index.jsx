import Footer from '../Footer'
import Header from '../Header'
import { Outlet } from 'react-router-dom'

export default function BasicLayout() {
	return (
		<div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
			<Header />
			<main className="container mx-auto flex-grow p-4">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
