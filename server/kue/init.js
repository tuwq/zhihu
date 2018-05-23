const util = require('../common/util.js');
const kue = require('kue');
const queues = kue.createQueue();
var path = __dirname + '/'
util.walk(path);


;(async () => {


	 // let job = queues.create("questionAdd", {
	 // 	question_id: 12312312,user_id: 1231312
	 // }).priority('high').attempts(5).save();


	// let job = queues.create("email", {
	// 	name: ["jason", "kitty", "jion", "mali"]
	// }).save();

	// queues.process('email', (job, done)=> {
	// 	console.log(job.data)
	// }); 

	
	//发送给主进程
	// process.send()
	// process.exit(0)
})()
module.exports = kue


