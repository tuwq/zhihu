import storage from 'good-storage'

const TOKEN_KEY = '__token__'

export function _saveToken(token) {
 	storage.set(TOKEN_KEY, token)
 	return token;
}

export function _loadToken(){
	// 如果找不到返回空串
	return storage.get(TOKEN_KEY, '')
}