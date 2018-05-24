const kue = require('kue');
const queues = kue.createQueue();
const mongoose = require('mongoose')
const Question = mongoose.model('Question')
const Answer = mongoose.model('Answer')
const Dynamic = mongoose.model('Dynamic')
const User = mongoose.model('User')

let self = this 
// 动态类型
// 1:问题相关 2:回答相关	3:评论相关
// 动作类型
// 1:提出	2:关注	3:点赞

// 提出回答
queues.process('answerAdd', (job, done)=> {
 	let data = job.data
 	let dynamic = new Dynamic({
 		type: 2,
 		action: 1,
 		user_id: data.user_id,
 		question_id: data.question_id,
 		answer_id: data.answer_id
 	})
 	dynamic.save()
 	// 放入用户Feed中
 	User.findById(data.user_id)
 	.select('sendFeed fans')
 	.exec((err,user)=> {
 		// 本人发Feed添加记录
 		user.sendFeed.push(dynamic._id)
 		user.save()
 		// 问题作者应该接收这个消息
 		Question.findById(data.question_id)
 		.populate('user_id')
 		.exec((err,question)=>{
 			let receiver = question.user_id
 			// 作者收Feed添加记录
 			receiver.receiveFeed.push(dynamic._id)
 			receiver.save()
 			// 粉丝收Feed添加记录
 			self.fansReceiveDynamic(user.fans,dynamic._id,done)
 		})
 	})
}); 

// 赞同回答
queues.process('praiseAnswer', (job, done)=> {
 	let data = job.data
 	// 点赞用户新增发送动态
 	// 被点赞用户新增接收动态
 	let answer_id = data.answer_id
 	let sender_id = data.sender
 	let receiver_id = data.receiver
 	// 回答的问题
 	Answer.findById(answer_id)
 	.select('question_id')
 	.exec((err,dbAnswer)=>{
 		let question_id = dbAnswer.question_id
 		// 是否是两次相同行为
	 	Dynamic.find({
	 		type: 2,
	 		action: 3,
	 		user_id: sender_id,
	 		question_id: question_id,
	 		answer_id: answer_id
	 	}).exec((err,dbDynamics)=>{
	 		if ( dbDynamics.length != 0 ) {
	 			// 注意这里返回done
	 			return done()
	 		}
	 		let dynamic = new Dynamic({
		 		type: 2,
		 		action: 3,
		 		user_id: sender_id,
		 		question_id: question_id,
		 		answer_id: answer_id 
		 	})
		 	dynamic.save()
		 	// 放入用户Feed中
		 	User.findById(sender_id)
		 	.select('sendFeed fans')
		 	.exec((err,sender)=> {
		 		// 发送者发Feed添加记录
		 		sender.sendFeed.push(dynamic._id)
		 		sender.save()
		 		// 发送者和接收者为同一个时，不接收自己的消息
		 		if ( sender_id === receiver_id) {
		 			self.fansReceiveDynamic(sender.fans,dynamic._id,done)
		 		}else {
		 			User.findById(receiver_id)
			 		.select('receiveFeed')
			 		.exec((err,receiver)=>{
			 			// 接收者收Feed添加记录
			 			receiver.receiveFeed.push(dynamic._id)
			 			receiver.save()
			 			// 粉丝收Feed添加记录
			 			self.fansReceiveDynamic(sender.fans,dynamic._id,done)
			 		})
		 		}
		 	})
	 	})
 	})
}); 

exports.answerAdd = function ({question_id,answer_id,user_id}) {
	let job = queues.create("answerAdd",{
		question_id,answer_id,user_id
	}).save()
}

exports.praiseAnswer = function ({answer_id,sender,receiver}) {
	let job = queues.create("praiseAnswer",{
		answer_id,sender,receiver
	}).save()
}

exports.fansReceiveDynamic = function (fans,dynamic_id,done) {
	(function iterator(i){
		if ( i === fans.length ) {
			return done()
		}
		User.findById(fans[i])
		.select('receiveFeed')
		.exec((err,fan)=>{
			fan.receiveFeed.push(dynamic_id)
			fan.save()
			iterator( i + 1 )
		})
	})(0)
}
