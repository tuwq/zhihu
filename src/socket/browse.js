import io from 'socket.io-client';
// 与服务端进行连接
const socket = io('http://localhost:4000')


export function readBrowseCount(question_id,callback) {
	// 向服务端发送信息
	socket.emit('browse',{question_id: question_id})
	
}	

// 接收来自服务端的信息事件
export function MessageListener(key,callback) {
	socket.on(key,callback)
}


