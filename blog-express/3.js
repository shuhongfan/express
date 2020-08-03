var express=require('express')
var app=express()

// request请求对象
// response响应对象
// next 下一个中间件
// app.use(function (req,res,next) {
//     // console.log('请求进来了')
//     console.log('1')
//     next()
// })
// app.use(function (req,res,next) {
//     console.log('2')
//     next()
// })
// app.use(function (req,res,next) {
//     console.log('3')
//     next('333 end')
// })

// app.use(function (req,res,next) {
//     console.log('1')
//     next()
// })
// app.use('/a',function (req,res,next) {
//     console.log(req.url)
// })
// app.use('/b',function (req,res,next) {
//     console.log(req.url)
// })

app.use(function (req,res,next) {
    console.log(1)
    next()
})
app.use('/',function (req,res,next) {
    console.log('/')
    next()
})
app.use(function (req,res,next) {
    console.log(2)
    next()
})
app.use('')

app.listen(5000,function () {
    console.log('runing')
})
