export function dynamicReadSendApi(data, callback) {
	axios.post(global.serverUrl+'/dynamic/readSend',data)
	.then((res)=>{
		callback(res)
	})
}