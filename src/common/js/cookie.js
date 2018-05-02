import cookies from 'js-cookie'

const TOKEN_KEY = '__token__'

export function _setToken(token,config) {
	cookies.set(TOKEN_KEY,token,config)
	return token
}

export function _getToken() {
	return cookies.get(TOKEN_KEY)
}

export function _removeToken(config) {
	return cookies.remove(TOKEN_KEY)
}

export function set(name,value,config) {
	cookies.set(name,value,config)
	return value
}

export function get(name) {
	return cookies.get(name)
}

export function remove(name,config) {
	cookies.remove(name,config)
}

export function getJSON(name) {
	cookies.getJSON(name)
}