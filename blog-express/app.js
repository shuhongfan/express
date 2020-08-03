var express=require('express')
var path=require('path')
var router=require('./router')
var bodyParser = require('body-parser')
var session = require('express-session')

var app=express()

// 配置art-template
app.engine('html', require('express-art-template'));
// app.set('views-old', path.join(__dirname, 'views-old')); // 设置默认模板路径

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

// 配置seesion
app.use(session({
    secret: 'itcast', // 配置加密字符串
    resave: false,
    saveUninitialized: true
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 把路由挂载到app中
app.use(router)

// 404中间件
// app.use(function (req,res) {
//     res.render('404.html')
// })
app.use(function (err,req,res,next) {
    res.status(500).json({
        err_code:500,
        message:err.message
    })
})

app.listen(3000,function () {
    console.log('running')
})
