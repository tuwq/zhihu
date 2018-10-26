export function questionInsertApi(data, callback) {
	axios.post(global.serverUrl+'/question/insert',data)
	.then((res)=> {
		callback(res)
	})
}

export function questionVoteApi(data, callback) {
	axios.post(global.serverUrl+'/vote/question',data)
	.then((res)=> {
		callback(res)
	})
}

export function questionRedApi(data, callback) {
	axios.post(global.serverUrl+'/question/read',data)
	.then((res)=> {
		callback(res)
	})
}

export function questionDetailApi(data, callback) {
	axios.post(global.serverUrl+'/question/detail',data)
	.then((res)=> {
		callback(res)
	})
}