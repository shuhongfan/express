var comments=[
  {
    name:'张三',
    message:'今天天气不错',
    dataTime:'2020-10-16'
  },
  {
    name:'张三1',
    message:'今天天气不错',
    dataTime:'2020-10-16'
  },
  {
    name:'张三2',
    message:'今天天气不错',
    dataTime:'2020-10-16'
  },
  {
    name:'张三3',
    message:'今天天气不错',
    dataTime:'2020-10-16'
  }
]
var express=require('express')
var app=express()
// 配置bodyparser中间件
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 配置使用art-template
app.engine('html', require('express-art-template'));
// 利用 Express 托管静态文件
app.use('/public/',express.static('./public/'))
app.get('/',function (req,res) {
  res.render('index.html',{
    comments:comments
  })
})
app.get('/post',function (req,res) {
  res.render('post.html')
})
app.post('/post',function (req,res) {
  console.log('收到post请求')
  console.log(req.body)
  var comment=req.body
  comment.dataTime='2017-11-5'
  comments.unshift(comment)
  res.redirect('/')
})
app.get('/pinglun',function (req,res) {
  console.log(req.query)
  var comment=req.query
  comment.dataTime='2017-11-5 10:58:51'
  comments.unshift(comment)
  res.redirect('/')
})
app.listen(3000,function () {
  console.log('running')
})


// var http=require('http')
// var fs=require('fs')
// var url=require('url')
// var template=require('art-template')
// http
//     .createServer(function (req,res) {
//       // 接收表单提交的数据
//       // 使用url.parse方法将路径解析为一个方便操作的对象
//       // 第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
//       var parseObj=url.parse(req.url,true)
//       // console.log('parseObj',parseObj)
//       // 单独获取不包含查询字符串的路径部分 该路径不包含？之后的内容
//       var pathname=parseObj.pathname
//       // console.log('pathname',pathname)
//
//       if (pathname==='/'){
//         fs.readFile('./views/index.html',function (err,data) {
//           if (err){
//             return res.end('404 not found')
//           }
//           var htmlStr=template.render(data.toString(),{
//             comments:comments
//           })
//           res.end(htmlStr)
//         })
//       } else if (pathname==='/pinglun'){
//         console.log(parseObj.query)
//         // res.end(JSON.stringify(parseObj.query))
//         // 存储表单提交的数据
//         var comment=parseObj.query
//         comment.dataTime='2017.-77-77 17:11:65'
//         comments.push(comment)
//         // 服务器跳转
//         res.statusCode=302
//         res.setHeader('Location','/')
//         res.end()
//       } else if (pathname==='/post'){
//         fs.readFile('./views/post.html',function (err,data) {
//           if (err){
//             return res.end('404 not found')
//           }
//           res.end(data)
//         })
//       } else if (pathname.indexOf('/public/')===0){
//         // 开放public目录中的静态资源
//         console.log(pathname)
//         fs.readFile('.'+pathname,function (err,data) {
//           if (err){
//             return res.end('404 not found')
//           }
//           res.end(data)
//         })
//       } else {
//         fs.readFile('./views/404.html',function (err,data) {
//           if (err){
//             return res.end('404 not found')
//           }
//           res.end(data)
//         })
//       }
//     })
//     .listen(3000,function () {
//       console.log('running...')
//     })
