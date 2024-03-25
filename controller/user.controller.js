const jwt = require('jsonwebtoken')

const { User } = require('../models')
const crud = require('./utils')

class UserController {
  async login(ctx, next) {
    const { username = '', password = '' } = ctx.request.body
    let token = jwt.sign({ username, password }, 'secret', {
      expiresIn: 7 * 24 * 60 * 60,
      algorithm: 'HS256'
    })
    ctx.body = {
      code: 200,
      msg: '登录成功',
      data: {
        username,
        token
      }
    }
  }

  async add(ctx, next) {
    const { username = '', password = '' } = ctx.request.body
    await crud.add(ctx, User, { username, password })
  }

  async update(ctx, next) {
    const params = ctx.request.body
    await crud.update(ctx, User, { _id: params._id }, { username: params.username, password: params.password })
  }

  async del(ctx, next) {
    const { _id } = ctx.request.body
    await crud.del(ctx, User, { _id })
  }

  async find(ctx, next) {
    await crud.find(ctx, User)
  }

  async findOne(ctx, next) {
    const { id: _id } = ctx.params
    await crud.findOne(ctx, User, { _id })
  }
}

module.exports = new UserController()