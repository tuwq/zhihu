const kue = require('kue');
const queues = kue.createQueue();
const mongoose = require('mongoose')
const questionKue = require('./question.js')
const answerKue = require('./answer.js')

// 处理被点赞动态问题
// type, 0:问题  1:回答 2:评论
exports.praise = function (type,target_id,sender,receiver) {
	if ( type ===  0 ) {
		questionKue.praiseQuestion({
			question_id: target_id,
			sender: sender,
			receiver: receiver
		})
	}else if( type == 1 ){
		answerKue.praiseAnswer({
			answer_id: target_id,
			sender: sender,
			receiver: receiver
		})
	}else if( type == 2 ){

	}
} 
