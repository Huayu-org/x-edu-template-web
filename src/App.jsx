import Loading from '@/component/Status/Loading'
import ThemeProvider from '@/component/Theme'
import router from '@/config/router'
import { RouterProvider } from 'react-router'

function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={router} fallbackElement={<Loading />} />
		</ThemeProvider>
	)
}

export default App
