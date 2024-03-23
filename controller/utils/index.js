
/**
 * 用于添加数据的公共方法
 * @param {*} ctx
 * @param {*} model
 * @param {*} params
 */
const add = async (ctx, model, params) => {
  try {
    const result = await model.create(params)
    if (result) {
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: result,
      }
    } else {
      ctx.body = {
        code: 300, // 300 业务错误
        msg: '添加失败',
      }
    }
  } catch (err) {
    ctx.body = {
      code: 400, // 400 系统错误
      msg: '添加出现异常',
    }
    console.error(err)
  }
}

/**
 * 用于更新数据的公共方法
 * @param {*} ctx
 * @param {*} model
 * @param {*} where
 * @param {*} params
 */
const update = async (ctx, model, where, params) => {
  try {
    const result = await model.updateOne(where, params)
    if (result.modifiedCount === 1) {
      ctx.body = {
        code: 200,
        msg: '修改成功',
        data: result,
      }
    } else {
      ctx.body = {
        code: 300, // 300 业务错误
        msg: '修改失败',
      }
    }
  } catch (err) {
    ctx.body = {
      code: 400, // 400 系统错误
      msg: '修改出现异常',
    }
    console.error(err)
  }
}

/**
 * 用于删除数据的公共方法
 * @param {*} ctx
 * @param {*} model
 * @param {*} where
 */
const del = async (ctx, model, where = null) => {
  try {
    const result = await model.findOneAndDelete(where)
    if (result) {
      ctx.body = {
        code: 200,
        msg: '删除成功',
        data: result,
      }
    } else {
      ctx.body = {
        code: 300, // 300 业务错误
        msg: '删除失败',
      }
    }
  } catch (err) {
    ctx.body = {
      code: 400, // 400 系统错误
      msg: '删除出现异常',
    }
    console.error(err)
  }
}

/**
 * 用于查询数据的公共方法
 * @param {*} model
 * @param {*} ctx
 * @param {*} where
 */
const find = async (ctx, model, where = null) => {
  try {
    const result = await model.find(where)
    ctx.body = {
      code: 200,
      msg: '查询成功',
      data: result,
    }
  } catch (err) {
    ctx.body = {
      code: 400, // 400 系统错误
      msg: '查询出现异常',
    }
    console.error(err)
  }
}

/**
 * 用于查询单条数据的公共方法
 * @param {*} ctx
 * @param {*} model
 * @param {*} where
 */
const findOne = async (ctx, model, where = null) => {
  try {
    const result = await model.findOne(where)
    if (result) {
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data: result,
      }
    } else {
      ctx.body = {
        code: 300, // 300 业务错误
        msg: '查询失败',
      }
    }
  } catch (err) {
    ctx.body = {
      code: 400, // 400 系统错误
      msg: '查询出现异常',
    }
    console.error(err)
  }
}

module.exports = {
  add,
  update,
  del,
  find,
  findOne,
}
