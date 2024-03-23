const mongoose = require('mongoose')

// 系统用户模型对象
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
})
const User = mongoose.model('users', userSchema)

module.exports = {
  User,
}
