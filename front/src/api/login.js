export function registApi(data, callback) {
	axios.post(global.serverUrl+'/user/regist',data)
	.then((res) => {
		callback(res)
	})
}

export function getCodeApi(data, callback) {
	axios.post(global.serverUrl+'/user/getCode',data)
	.then((res)=> {
		callback(res)
	});
}

export function pwLoginApi(data, callback) {
	axios.post(global.serverUrl+'/user/pwLogin',data)
	.then((res)=> {
		callback(res)
	})
}

export function phoneLoginApi(data, callback) {
	axios.post(global.serverUrl+'/user/phoneLogin',data)
	.then((res) => {
		callback(res)
	})
}