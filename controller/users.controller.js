const jwt = require('jsonwebtoken')

const { Users } = require('../models/users')
const crud = require('./utils')

class UserController {
  /**
   * 用户登录
   */
  async login(ctx, next) {
    const { username = '', password = '' } = ctx.request.body

    try {
      const result = await Users.findOne({ username, password })
      if (result) {
        let token = jwt.sign({ username: result.username, _id: result._id }, 'jianshu-serve-jwt', {
          expiresIn: 7 * 24 * 60 * 60,
          algorithm: 'HS256'
        })
        ctx.body = {
          code: 200,
          msg: '登录成功',
          data: {
            token,
            _id: result._id
          }
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '用户名或密码错误'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: '登录出现异常',
        err,
      }
    }
  }

  /**
   * 用户注册
   */
  async register(ctx, next) {
    const { username, password } = ctx.request.body

    // 用户名是否已注册
    let isDouble = false

    const result = await Users.findOne({ username })
    if (result) isDouble = true

    if (isDouble) {
      ctx.body = {
        code: 300,
        msg: '用户名已存在'
      }
      return
    }

    try {
      const addResult = await Users.create({ username, password })
      if (addResult) {
        ctx.body = {
          code: 200,
          msg: '注册成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '注册失败'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: '注册时出现异常',
        err
      }
    }
  }

  /**
   * 用户认证接口
   */
  async verify(ctx, next) {
    const { Authorization } = ctx.header
    const token = Authorization.replace('Bearer ', '')

    try {
      const result = jwt.verify(token, 'jianshu-serve-jwt')
      const res = await Users.findOne({ _id: result._id })
      if (res) {
        ctx.body = {
          code: 200,
          msg: '用户认证成功',
          data: res,
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '用户认证失败'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: '用户认证失败',
        err
      }
    }
  }

  async updatePassword(ctx, next) {
    const { username, password } = ctx.request.body
    try {
      const result = await Users.updateOne({ username }, { password })
      console.log(result)
      if (result.matchedCount === 1 && result.modifiedCount === 1) {
        ctx.body = {
          code: 200,
          msg: '密码修改成功',
        }
      } else if (result.matchedCount === 1 && result.modifiedCount === 0) {
        ctx.body = {
          code: 300,
          msg: '密码重复'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '密码修改失败'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: '修改密码时出现异常',
        err,
      }
    }

  }

  async add(ctx, next) {
    const { username = '', password = '' } = ctx.request.body
    await crud.add(ctx, Users, { username, password })
  }

  async update(ctx, next) {
    const params = ctx.request.body
    await crud.update(ctx, Users, { _id: params._id }, { username: params.username, password: params.password })
  }

  async del(ctx, next) {
    const { _id } = ctx.request.body
    await crud.del(ctx, Users, { _id })
  }

  async find(ctx, next) {
    await crud.find(ctx, Users)
  }

  async findOne(ctx, next) {
    const { id: _id } = ctx.params
    await crud.findOne(ctx, Users, { _id })
  }
}

module.exports = new UserController()