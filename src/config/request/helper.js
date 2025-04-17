import config from '@/config/env'
import Request from '@/util/request'

export function rawAPI(params) {
	const { hostKey, prefix = '' } = params

	if (hostKey) {
		params.originBaseURL = `${config.api[hostKey]}${prefix}`
		params.baseURL = params.originBaseURL
	}

	const api = Request.create({
		...params,
	})
	return api
}

export function generateCommonAPI(params) {
	const api = rawAPI({
		...params,
	})

	// 请求拦截器
	api.interceptors.request.use(async (c) => {
		return c
	})

	// 响应拦截器
	api.interceptors.response.use(async (resp) => {
		return resp
	})

	return api
}

export function generateCommonAPIWithAuth(params) {
	const api = rawAPI({
		...params,
	})

	// 请求拦截器 添加鉴权
	api.interceptors.request.use(async (c) => {
		if (c.noAuth) {
			return c
		}
		const Authorization = ''
		if (Authorization) {
			c.headers.Authorization = Authorization
		}
		return c
	})

	return api
}
