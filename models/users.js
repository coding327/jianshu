const mongoose = require('mongoose')

// 系统用户模型对象
const userSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    select: false, // 查询用户对象，密码显示使用隐藏状态
  },
  avatar: {
    type: String,
    default: ''
  },
  sex: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: ''
  }
})
const Users = mongoose.model('users', userSchema)

module.exports = {
  Users,
}
