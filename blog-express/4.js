var express=require('express')
var fs=require('fs')

var app=express()

app.get('/abc',function (req,res,next) {
    console.log('abc')
    req.foo='bar'
    next()
})

app.get('/abc',function (req,res,next) {
    console.log(req.foo)
    console.log('abc 2')
})

app.get('/',function (req,res,next) {
    fs.readFile('./sa/s',function (err,data) {
        if (err){
            // 当调用next的时候 如果传递多个参数 将直接进入
            next(err)
        }
    })
})
app.get('/',function (req,res,next) {
    console.log('/2')
})
app.get('/a',function (req,res,next) {
    fs.readFile('./sa/s',function (err,data) {
        if (err){
            next(err)
        }
    })
})
app.use(function (err,req,res,next) {
    console.log(err)
    res.status(500).send(err.path)
})

app.listen(5000,function () {
    console.log('running')
})
