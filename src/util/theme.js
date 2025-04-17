export function getLocalTheme() {
	const theme = localStorage.getItem('theme')
	if (theme) {
		return theme
	}
	return 'default'
}

export function setLocalTheme(theme) {
	localStorage.setItem('theme', theme)
}
