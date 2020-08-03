 var express=require('express')

 var app=express()

 app.use('/public/',express.static('./public/'))
 app.use(express.static('./public/'))
 app.use('/a/',express.static('./public/'))
 app.use('/abc/d',express.static('./public/'))

 app.get('/',function (req,res) {
    res.send('hello world')
 })

 app.get('/login',function (req,res) {
    res.send('我是login')
 })

 app.listen(3000,function () {
     console.log('running ')
 })
