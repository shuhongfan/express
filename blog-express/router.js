var express=require('express')
var router=express.Router()
var User=require('./modules/user')
var md5=require('blueimp-md5')

router.get('/',function (req,res) {
    console.log(req.session.user)
    // res.send('hello')
    res.render('index.html',{
        user:req.session.user
    })
})
// 注册页面
router.get('/register',function (req,res) {
    res.render('register.html')
})
// 处理注册请求
// router.post('/register',function (req,res) {
//     console.log(req.body)
//     // 1.获取表单提交的数据
//     var body=req.body
//     // 2.操作数据库 判断用户是否存在 如果存在 不允许注册
//     User.findOne({
//         $or:[
//             {email:body.email},
//             {nickname:body.nickname}
//         ]
//     },function (err,data) {
//         if (err){
//             return res.status(500).json({
//                 success:false,
//                 message:'服务器错误'
//             })
//         }
//         console.log(data)
//         if (data){
//             return res.status(200).json({
//                 err_code:1,
//                 message:'邮箱或昵称已存在'
//             })
//         }
//         // md5加密
//         body.password=md5(md5(body.password))
//         new User(body).save(function (err,user) {
//             if (err){
//                 return res.status(500).json({
//                     err_code:500,
//                     message:'服务端错误'
//                 })
//             }
//             // express提供一个响应方法 json
//             // 该方法接收一个对象作为参数 他会自动帮你把对象转换为字符串再发送给浏览器
//             res.status(200).json({
//                 err_code:0,
//                 message:'ok'
//             })
//         })
//     })
//     // 3.发送响应
// })
router.post('/register',async function (req,res,next) {
    var body=req.body

    if (await User.findOne({email:body.email})){
        return res.status(200).json({
            err_data:1,
            message:'邮箱已存在'
        })
        // return res.send('邮箱已存在,请重试！！')
        // return res.render('register.html',{
        //     err_message:'邮箱已存在',
        //     form:body
        // })
    }
    if (await User.findOne({nickname:body.nickname})){
        return res.status(200).json({
            err_code:2,
            message:'昵称已存在'
        })
    }
    // 对密码进行md5重复加密
    body.password=md5(md5(body.password))
    // 创建新用户 执行注册
    await new User(body).save()
        .then(function (user) {
            // 保存session
            req.session.user = user
            return res.status(200).json({
                err_code:0,
                message:'ok'
            })
            // 服务器重定向针对异步请求无效
            // res.redirect('/')
        })
    // if (await new User(body).save(err,user)){
    //     // 保存session
    //     req.session.user = user
    //     return res.status(200).json({
    //         err_code:0,
    //         message:'ok'
    //     })
    //     // 服务器重定向针对异步请求无效
    //     // res.redirect('/')
    // }

    // res.status(500).json({
    //     err_data:500,
    //     message:'服务器错误'
    // })
    return next(err)
})
// 登录页面
router.get('/login',function (req,res) {
    res.render('login.html')
})
// 处理登录请求
router.post('/login',function (req,res,next) {
    console.log(req.body)
    var body=req.body

    User.findOne({
        email:body.email,
        password:md5(md5(body.password))
    },function (err,user) {
        if (err){
            // return res.status(500).json({
            //     err_code:500,
            //     message:err.message
            // })
            return next(err)
        }
        if (!user){
            return res.status(200).json({
                err_code:1,
                message:'邮箱或密码不正确'
            })
        }
        // 用户存在 登录成功 通过session记录登录状态
        req.session.user=user
        res.status(200).json({
            err_code:0,
            message:'ok'
        })
    })
})
// 登出页面
router.get('/logout',function (req,res) {
    // 清除登录状态
    req.session.user=null
    // 重定向到首页
    res.redirect('/')
})

module.exports=router
