const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types


//加密难度盐
const SALT_WORK_FACTOR = 10
//最大错误登录次数
const MAX_LOGIN_ATTEMPTS = 5
//错误登录保护锁时间	2小时
const LOCK_TIME = 2 * 60 * 60 * 1000

var UserSchema = new Schema({
	username: {
		  unique: false,
	    required: true,
	    type: String,
      default: '匿名用户'
	},
	email: {
		unique: false,
		required: false,
		type: String,
		default: ''
	},
	telphone: {
		unique: true,
		required: true,
		type: String,
		default: ''
	},
	password: {
  	unique: false,
    required: true,
    type: String,
    default: ''
	},
	info: {
    gender: {
      type: Number,
      default: 0
    },
    intro: {
      type: String,
      default: ''
    }, 
    place: {
      type: String,
      default: ''
    }, 
    industry: {
      type: String,
      default: ''
    }, 
    c_experience: {
      type: String,
      default: ''
    },
    e_experience: {
      type: String,
      default: ''
    }, 
    introduction: {
      type: String,
      default: ''
    }
  },
	avatar: {
    type: String,
    default: 'avatar.png'
  },
	status: {
    type: Number,
    default: 0
  },
	hobby: [String],			
	registStatus: {
		type: Number,
		default: 0
	},
	attentions: [{
	    type: ObjectId,
	    ref: 'User'
	}],
	fans: [{
	    type: ObjectId,
	    ref: 'User'
	}],
  followers: [{
      type: ObjectId,
      ref: 'User'
  }],
	answers: [{
	    type: ObjectId,
	    ref: 'Answer'
	}],
	comments: [{
		type: ObjectId,
		ref: 'Comment'
	}],
	approve: {
		type: Number,
		default: 0
	},
  sendFeed: [{
    type: ObjectId,
    ref: 'Dynamic'
  }],
  receiveFeed: [{
    type: ObjectId,
    ref: 'Dynamic'
  }],
	meta: {
	    createdAt: {
	      type: Date,
	      default: Date.now()
	    },
	    updatedAt: {
	      type: Date,
	      default: Date.now()
	    }
  	}
})

UserSchema.virtual('answerSum').get(function() {
    return 0
});

UserSchema.virtual('fansLength').get(function() {
    return 0
});

//虚拟属性，不会把这个字段json上传和存储到数据库，但方法中有
UserSchema.virtual('isLocked').get(function () {
  //是否保护锁还存在
  return !!(this.lockUntil && this.lockUntil > Date.now())
})


UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})


UserSchema.pre('save', function (next) {
  //没有过修改password
  if (!this.isModified('password')) return next()
  //加密固定写法
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error)

      this.password = hash
      next()
    })
  })
})

//给实例对象添加方法
UserSchema.methods = {
  //验证是否成功
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  //每一次密码错误
  incLoginAttepts: (user) => {
    return new Promise((resolve, reject) => {
      //保护锁不存在
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set: {
          	//错误次数1
            loginAttempts: 1
          },
          $unset: {
          	//保护时间加1
            lockUntil: 1
          }
        }, (err) => {
          if (!err) resolve(true)
          else reject(err)
        })
      } 
      //保存锁存在时间
      else {
        let updates = {
          //错误次数+1
          $inc: {
            loginAttempts: 1
          }
        }
        //如果错误登录数大于5且没有登录锁
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          //设置登录保护锁
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }
        //增加设置
        this.update(updates, err => {
      	  //返回promise
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}

module.exports = UserSchema