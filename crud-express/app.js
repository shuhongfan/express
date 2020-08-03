var express=require('express')
// 导入router路由模块
var router=require('./router.js')

var app=express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html', require('express-art-template'));

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

// router(app)
// 把路由挂载到app服务器中
app.use(router)

app.listen(3000,function () {
    console.log('runing')
})
