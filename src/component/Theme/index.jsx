import { ThemeContext } from '@/context/themeContext'
import { getLocalTheme, setLocalTheme } from '@/util/theme'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { useEffect, useState } from 'react'

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(getLocalTheme())

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [theme])

	const getTheme = () => theme

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === 'dark' ? 'default' : 'dark'
			setLocalTheme(newTheme)
			return newTheme
		})
	}

	const antdThemeConfig = {
		algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
	}

	return (
		<ThemeContext.Provider value={{ theme, setTheme, getTheme, toggleTheme }}>
			<ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
		</ThemeContext.Provider>
	)
}
export default ThemeProvider
