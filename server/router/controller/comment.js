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
		if(checkUtil.isEmtry([fields.user_id])) {
			return res.json(util.Result('id缺失',1))
		}
		if(fields.question_id=='' && fields.answer_id=='') {
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


exports.insertToQuestion = function (req,res) {
	var token = req.headers.token
	var fields = req.body;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		if(checkUtil.isEmtry(fields.content)) {
			return res.json(util.Result('信息不完整',1))
		}
		if(checkUtil.isEmtry([fields.user_id,fields.question_id])) {
			return res.json(util.Result('id缺失',1))
		}	
		if (!fields.to) {
			comment = new Comment({
				content: fields.content,
				question_id: fields.question_id,
				user_id: fields.user_id,
				to: null
			})
			comment.save()
			return res.json(util.Result(0))
		}else {
			// 你不能回复你自己
			Comment.findById(fields.to)
			.exec((err,dbComment)=> {
				if (dbComment.user_id == fields.user_id) {
					return res.json(util.Result('你不能回复你自己',1))
				}
				comment = new Comment({
					content: fields.content,
					question_id: fields.question_id,
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
	var limit = fields.limit
	var page = fields.page
	var skip = limit*(page-1)
	Comment.find({answer_id: fields.answer_id})
	.populate('user_id')
	.populate({
		path: 'to',
		populate: {
			path: 'user_id',
			select: 'username'
		}
	})
	.limit(limit)
	.skip(skip)
	.sort({'meta.updatedAt': -1})
	.exec((err,comments)=> {
		Comment.count({answer_id: fields.answer_id},(err,count)=> {
			return res.json(util.Result({comments: comments,count: count}))
		})
	})
}

exports.readToQuestion = function (req,res) {
	let fields = req.body
	var limit = fields.limit
	var page = fields.page
	var skip = limit*(page-1)
	// 读取mongoose时 不存在属性使用undefined，而不能使用空字符串
	Comment.find({question_id: fields.question_id,answer_id: undefined})
	.populate('user_id')
	.populate({
		path: 'to',
		populate: {
			path: 'user_id',
			select: 'username'
		}
	})
	.limit(limit)
	.skip(skip)
	.sort({'meta.updatedAt': -1})
	.exec((err,comments)=> {
		Comment.count({question_id: fields.question_id,answer_id: undefined},(err,count)=> {
			return res.json(util.Result({comments: comments,count: count}))
		})
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
			arr.push(rootNode)
			// 寻找根评论下所有评论
			getSons(rootNode,arr,(arr)=> {
				return res.json(util.Result({arr: arr}))
			})
		})
	})
}

function getSons(rootNode,arr,callback) {
	Comment.find({to: rootNode._id})
	.exec((err,sons)=>{
		if (sons.length === 0 ) {
			if (callback) {
				callback(arr)
			}
			
		}else {
			sons.forEach((item)=> {
				arr.push(item)
				return getSons(item,arr)
			})
		}
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


exports.test = function (req,res) {
	Comment.find({},(err,comments)=> {
		res.json(util.Result(comments))
	})
}