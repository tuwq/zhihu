var mongoose = require('mongoose')
var Answer = mongoose.model('Answer')
var Question = mongoose.model('Question')
var Comment = mongoose.model('Comment')
const util = require('../../common/util.js');
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')

exports.insert = function (req,res) {
	// 检查登录
	var token = req.headers.token
	var fields = req.body;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		if(checkUtil.isEmtry(fields.content)) {
			return res.json(util.Result('信息不完整',1))
		}
		if(checkUtil.isEmtry([fields.user_id,fields.question_id,fields.answer_id])) {
			return res.json(util.Result('id缺失',1))
		}
		let comment
		// 当to 不存在，说明是根评论
		if (!fields.to) {
			comment = new Comment({
				content: fields.content,
				question_id: fields.question_id,
				answer_id: fields.answer_id,
				user_id: fields.user_id,
				to: null
			})
			comment.save()
			return res.json(util.Result(0))
		}else{	
			// 你不能回复你自己
			Comment.findById(fields.to)
			.exec((err,dbComment)=> {
				if (dbComment.user_id == fields.user_id) {
					return res.json(util.Result('你不能回复你自己',1))
				}
				comment = new Comment({
					content: fields.content,
					question_id: fields.question_id,
					answer_id: fields.answer_id,
					user_id: fields.user_id,
					to: fields.to
				})
				comment.save()
				return res.json(util.Result(0))
			})
		}
		
	}).catch((err)=> {
		return res.json(util.Result(401))
	})

}

exports.read = function (req,res) {
	let fields = req.body
	Comment.find({answer_id: fields.answer_id})
	.populate('user_id')
	.populate({
		path: 'to',
		populate: {
			path: 'user_id',
			select: 'username'
		}
	})
	.sort({'meta.updatedAt': -1})
	.exec((err,comments)=> {
		return res.json(util.Result({comments: comments}))
	})
}

exports.getConversation = function (req,res) {
	let fields = req.body
	var arr = []
	// 根据c_id找到c
	Comment.findById(fields.commentId,(err,dbComment)=> {
		if (!dbComment.to){

			return res.json(util.Result('该评论没有评论树'))
		}
		// 寻找根评论
		getRoot(dbComment,(rootNode)=> {
			console.log(rootNode)
			getSons(rootNode,arr,(arr)=> {
				return res.json(util.Result({ conversation: arr}))
			})
		})
	})
}
function getRoot(son,callback) {
	Comment.findById(son.to,(err,parent)=> {
		if (parent.to==undefined) {
			callback(parent)
			return
		}
		return getRoot(parent,callback)
	})
}

function getSons(parent,arr,callback) {
	Comment.find({to: parent._id},(err,sons)=> {
		if (sons.length==0){
			callback(arr)
			return
		}else{
			// (function iterator(i){
			// 	if (i==sons.length) {
			// 		return arr
			// 	}else{
			// 		arr.push(sons[i])
			// 		return getSons(sons[i])
			// 		iterator(i+1)	
			// 	}
			// })(0)
			sons.forEach(function(item,index){  
			    arr.push(item)
			    return getSons(item,arr,callback)
			});  
			// for (let i = 0; i < sons.length i ++ ) {
			// 	arr.push(sons[i])
			// 	return getSons(sons[i])
			// }
		}
	})
}

exports.test = function (req,res) {
	Comment.find({},(err,comments)=> {
		res.json(util.Result(comments))
	})
}