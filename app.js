var exports=require('express')

var app=exports()

app.get('/',function (req,res) {
    res.send('hello express!!!')
})
app.get('/about',function (req,res) {
    console.log(req.query)
    res.send('你好，我是exprss')
})

// app.use('/public/', express.static('./public/'))

app.listen(3000,function () {
    console.log('app is running at prot 3000')
})
