const fs = require('fs')
const path = require('path')
const multer = require('@koa/multer')

const router = require('koa-router')()
router.prefix('/upload')

const storage = multer.diskStorage({
  // 设置文件的存储位置
  destination(req, file, cb) {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let dir = `./public/uploads/${year}${month}${day}`

    // 判断目录是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      })
    }

    // 指定上传文件的目录
    cb(null, dir)
  },
  // 设置上传文件的文件名
  filename(req, file, cb) {
    // file.fieldname上传文件的字段名
    // Date.now()获取时间戳
    // file.originalname上传文件的原始文件名
    let filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    cb(null, filename)
  }
})

const upload = multer({ storage })

// 上传图片的接口
// upload.single指定上传单文件的字段名
router.post('/', upload.single('myfile'), async (ctx) => {
  if (ctx.file) {
    ctx.body = {
      code: 200,
      msg: '文件上传成功',
      data: {
        url: `${ctx.origin}/${path.relative('public', ctx.file.path)}` // 返回图片的访问地址[ctx.origin是服务器真实地址，ctx.file.path是图片的存储地址，path.relative是获取两个路径之间的相对路径，replace是替换掉多余的双反斜杠]
      }
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '文件上传失败'
    }
  }
})

module.exports = router