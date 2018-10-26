export function commentVoteApi(data, callback) {
	axios.post(global.serverUrl+'/vote/comment',data)
	.then((res)=> {
		callback(res)
	})
}

export function commentInsertQuestionApi(data, callback) {
	axios.post(global.serverUrl+'/comment/insert/question',data)
	.then((res) => {
		callback(res)
	})
}

export function commentInsertApi(data, callback) {
	axios.post(global.serverUrl+'/comment/insert',data)
	.then((res) => {
		callback(res)
	})
}

export function commentRedApi(data, callback) {
	axios.post(global.serverUrl+'/comment/read',data)
	.then((res)=> {
		callback(res)
	})
}

export function commentRedQuestionApi(data, callback) {
	axios.post(global.serverUrl+'/comment/read/question',data)
	.then((res)=> {
		callback(res)
	})
}

export function commentGetConversationApi(data, callback) {
	axios.post(global.serverUrl+'/comment/getConversation',data)
	.then((res)=> {
		callback(res)
	})
}