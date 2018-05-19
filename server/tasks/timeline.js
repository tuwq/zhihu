const cp = require('child_process')
const { resolve } = require('path')


;(async () => {
  //子进程脚本位置
  const script = resolve(__dirname, '../kue/timeline.js')
 //子进程启动并得到操作子进程对象
  const child = cp.fork(script, [])
  let invoked = false

  // 子进程错误时
  child.on('error', err => {
    if (invoked) return
    invoked = true
    console.log(err)
  })

  // 子进程退出时
  child.on('exit', code => {
    if (invoked) return
    invoked = true
    let err = code === 0 ? null : new Error('exit code ' + code)
    console.log(err)
  })
  //当子进程发送回消息时
  child.on('message', data => {
   	
  })
})()
