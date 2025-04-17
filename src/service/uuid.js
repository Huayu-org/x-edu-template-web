import uuidAPI from '@/config/request/uuid'

export async function getUUID() {
	const response = await uuidAPI.get('/generate/v4')
	return response.data
}
