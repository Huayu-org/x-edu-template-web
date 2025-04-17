import queryString from 'query-string'

export function getUrlQuery(url) {
	const query = (url ?? window.location.href).split('?')
	if (query.length > 1) {
		let params = {}
		query.slice(1).forEach((item) => {
			let parseString = item
			if (item.indexOf('#') > -1) {
				parseString = item.split(/\/?#/)[0]
			}
			params = {
				...queryString.parse(parseString),
				...params,
			}
		})
		return params
	}
	return {}
}
