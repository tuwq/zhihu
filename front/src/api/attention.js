export function attentionQuestionReadApi(data, callback) {
	axios.post(global.serverUrl+'/attention/question/read',data)
	.then((res)=> {
		callback(res)
	})
}

export function attentionQuestionAddApi(data, callback) {
	axios.post(global.serverUrl+'/attention/question/add', data)
	.then((res)=> {
		callback(res)
	})
}