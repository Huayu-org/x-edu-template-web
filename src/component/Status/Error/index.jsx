import { useRouteError } from 'react-router-dom'

const Error = ({ status }) => {
	let errorStatus = status
	const error = useRouteError()
	if (!errorStatus) {
		errorStatus = error.status || 500
	}
	const getMessage = () => {
		switch (errorStatus) {
			case 403:
				return '403: Forbidden - You do not have permission to access this resource.'
			case 404:
				return '404: Not Found - The resource you are looking for could not be found.'
			case 500:
				return '500: Internal Server Error - Something went wrong on our end.'
			default:
				return 'An unknown error occurred.'
		}
	}

	return <div>{getMessage()}</div>
}

export default Error
