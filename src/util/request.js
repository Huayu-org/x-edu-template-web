import axios from 'axios'
import { isFunction } from 'lodash-es'
import queryString from 'query-string'

const STATUS = {
	pending: 1,
	finish: 2,
	error: 3,
}

export default class Request {
	static create(config) {
		const cache = {}
		const _config = {
			withCredentials: false,
			loadingTime: 1500,
			shouldBlock(error) {
				const status = error?.response?.status
				return status === 429 || status === 503
			},
			block() {
				return true
			},
			blockTime: 10 * 60 * 1000,
			shouldRetry(error) {
				return error?.response?.status >= 500
			},
			...config,
		}
		const instance = axios.create(_config)

		const originRequest = instance.request.bind(instance)
		let blockRequest = false
		let blockError = null

		const handleError = (error, c) => {
			// failover 对于一个请求只允许进行一次
			if (isFunction(c.failover)) {
				const newConfig = c.failover(error, c)
				if (typeof newConfig === 'object') {
					return instance.request({
						...newConfig,
						failover: false,
					})
				}
			}

			if (isFunction(c.shouldBlock)) {
				blockRequest = c.shouldBlock(error)
				blockError = error
				setTimeout(() => {
					blockRequest = false
					blockError = null
				}, c.blockTime)
			}

			if (c.retry > 0 && c._retry < Math.min(c.retry, 2)) {
				if (c.shouldRetry(error)) {
					c._retry += 1
					return instance.request(c)
				}
			}
			if (isFunction(c.error)) {
				c.error(error, c)
			}
			return Promise.reject(error)
		}

		const getKey = ({ key, params, url }) => {
			if (key) {
				return key
			}
			const query = queryString.stringify(params)
			const _key = `${url}${query ?? `?${query}`}`
			return _key
		}

		const clearLoadingTimer = (key) => {
			if (cache[key]) {
				const { timer } = cache[key]
				if (timer) {
					clearTimeout(timer)
				}
			}
		}

		instance.request = function request(c) {
			const key = getKey(c)
			c.key = key
			const exist = cache[key]
			if (exist) {
				// get 请求支持缓存
				if (c.method === 'get') {
					// 同 url 请求还在等待的直接返回，不发起请求
					if (exist.status === STATUS.pending) {
						return cache[key]._request
					}
					// 强制请求，直接发起，忽略缓存情况
					if (c.force) {
						return originRequest(c)
					}
					// 存在缓存数据，直接使用
					if (cache[key].response) {
						return Promise.resolve(cache[key].response)
					}
				}
			} else {
				const { loading = _config.loading, loadingTime = _config.loadingTime } = c
				cache[key] = {
					status: STATUS.pending,
					timer: setTimeout(() => {
						if (isFunction(loading)) {
							loading({
								...c,
								key,
							})
						}
					}, loadingTime),
				}
			}

			const req = originRequest(c)
			cache[key]._request = req
			return req
		}

		{
			const actions = ['delete', 'get', 'head', 'options']
			actions.forEach((method) => {
				instance[method] = function request(url, c) {
					return instance.request({
						...c,
						method,
						url,
						data: (c || {}).data,
					})
				}
			})
		}

		{
			const actions = ['post', 'put', 'patch']
			actions.forEach((method) => {
				instance[method] = function request(url, data, c) {
					return instance.request({
						...c,
						method,
						url,
						data,
					})
				}
			})
		}

		instance.interceptors.request.use(
			(c) => {
				if (blockRequest && c.block(c)) {
					return Promise.reject(blockError)
				}
				c._retry = c._retry ?? 0
				return c
			},
			(error) => handleError(error, error.config)
		)

		instance.interceptors.response.use(
			(response) => {
				const c = response.config
				const { ttl, method, key } = c
				if (key) {
					clearLoadingTimer(key)
					if (cache[key]) {
						cache[key].status = STATUS.finish

						if (method.toLocaleLowerCase() === 'get' && ttl > 0) {
							cache[key].response = response
							if (cache[key].clearCacheTimer) {
								clearTimeout(cache[key].clearCacheTimer)
							}
							cache[key].clearCacheTimer = setTimeout(() => {
								delete cache[key]
							}, ttl)
						} else {
							delete cache[key]
						}
					}
				}
				if (isFunction(_config.complete)) {
					_config.complete(c)
				}
				return response
			},
			(error) => {
				const { key } = error.config
				if (key) {
					clearLoadingTimer(key)
					if (cache[key]) {
						cache[key].status = STATUS.error
						delete cache[key]
					}
				}
				if (isFunction(_config.complete)) {
					_config.complete(error.config)
				}
				return handleError(error, error.config)
			}
		)

		instance.clear = function clear(url) {
			if (url) {
				const item = cache[url]
				if (item && item.status !== STATUS.pending) {
					delete cache[url]
				}
			} else {
				Object.keys(cache).forEach((key) => {
					const item = cache[key]
					if (item && item.status !== STATUS.pending) {
						delete cache[key]
					}
				})
			}
		}

		return instance
	}
}
