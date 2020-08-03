var http=require('http')
var url=require('url')


var server=http.createServer(function (req,res) {
    // 解析get请求体
    // 解析表单post请求体
    // 解析cookie
    // 解析session
    // 使用模板引擎
    var urlObj=url.parse(req.url,true)
    req.query=urlObj.query

    req.body={
        foo:'bar'
    }

    req.cookies={
        isLogin:true
    }

    req.session={}

    res.render
})

server.listen(5000,function () {
    console.log('5000 running')
})
