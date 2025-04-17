import develop from './develop'
import preproduction from './preproduction'
import product from './product'

const _global_env = window._global_env || process.env._global_env || 'develop'

let config

switch (_global_env) {
	case 'develop':
		config = develop
		break
	case 'preproduction':
		config = preproduction
		break
	case 'product':
		config = product
		break
	default:
		throw new Error(`Unknown environment: ${_global_env}`)
}

export default config
