const kue = require('kue');
const queues = kue.createQueue();
const mongoose = require('mongoose')
const Dynamic = mongoose.model('Dynamic')
const User = mongoose.model('User')

let self = this 
// 动态类型
// 1:问题相关 2:回答相关	3:评论相关
// 动作类型
// 1:提出	2:关注	3:点赞
;(async () => {

	// 提出问题
	queues.process('questionAdd', (job, done)=> {
	 	let data = job.data
	 	let dynamic = new Dynamic({
	 		type: 1,
	 		action: 1,
	 		user_id: data.user_id,
	 		question_id: data.question_id 
	 	})
	 	dynamic.save()
	 	// 放入用户Feed中
	 	User.findById(data.user_id)
	 	.select('sendFeed fans')
	 	.exec((err,user)=> {
	 		// 本人发Feed添加记录
	 		user.sendFeed.push(dynamic._id)
	 		user.save()
	 		// 粉丝收Feed添加记录
	 		self.fansReceiveDynamic(user.fans,dynamic._id,done)
	 	})
	}); 

})()

exports.questionAdd = function ({question_id,user_id}) {
	let job = queues.create("questionAdd",{
		question_id,user_id
	}).priority('high').attempts(5).save()
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

