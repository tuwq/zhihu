export function voteAnswerApi(data, callback) {
	axios.post(global.serverUrl+'/vote/answer',data)
	.then((res)=> {
		callback(res)
	})
}