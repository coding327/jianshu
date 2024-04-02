const router = require('koa-router')()
const { login, register, add, update, del, find, findOne } = require('../controller/users.controller')

router.prefix('/users')

// 登录系统用户
router.post('/login', login)

// 注册系统用户
router.post('/register', register)

// 添加系统用户
router.post('/add', add)

// 修改系统用户
router.post('/update', update)

// 修改系统用户
router.post('/del', del)

// 查询所有系统用户
router.get('/find', find)

// 查询单个系统用户
router.get('/find/:id', findOne)

module.exports = router
