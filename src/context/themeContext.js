import { createContext, useContext } from 'react'

const defaultTheme = 'default'

export const ThemeContext = createContext({
	theme: defaultTheme,
	setTheme: () => {},
	getTheme: () => defaultTheme,
	toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)
