import { generateCommonAPI } from './helper'

const uuidAPI = generateCommonAPI({
	hostKey: 'uuid',
	prefix: '/api',
})

export default uuidAPI
