const io = require('socket.io')();
var mongoose = require('mongoose')
var Question = mongoose.model('Question')

var sum = 100

;(async () => {

  // 打开连接并处理客户端的事件
  io.on('connection',(socket)=> {
    // 接收并处理客户端的事件
    socket.on('browse',(data) => {
      
      Question.findById(data.question_id)
      .select('browseSum')
      .exec((err,question)=> {
        question.browseSum++
        question.save()
        socket.emit('browseSum',question.browseSum)
      })
      
    })

    // 断开事件
    socket.on('disconnect',(data)=> {
      // 已断开
      socket.emit('over','已断开')
    })
  })

  io.listen(4000);
})()



