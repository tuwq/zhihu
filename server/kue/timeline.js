const kue = require('kue');
const queues = kue.createQueue();

;(async () => {

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
