var mongoose=require('mongoose')

var Schema=mongoose.Schema

// 连接数据库
mongoose.connect('mongodb://localhost/itcast')

// 表结构的属性名称 约束
var blogSchema=new Schema({
    title:String,
    author:String,
    body:String,
    comments:[{body:String,date:Date}],
    date: {type:Date,default:Date.now()},
    hidden:Boolean,
    meta:{
        votes:Number,
        favs:Number
    }
})
var userSchema=new Schema({
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type:String
    }
})

// 将文档结构发布为模型
var User=mongoose.model('User',userSchema)
var Blog=mongoose.model('Blog',userSchema)

// 新增数据
// var admin=new User({
//     username:'李四',
//     password:'123456',
//     email:'admin@admin.com'
// })
// admin.save(function (err,ret) {
//     if (err){
//         console.log(err)
//     } else {
//         console.log('保存成功')
//         console.log(ret)
//     }
// })

// 查询数据
// User.find(function (err,ret) {
//     if (err){
//         console.log('查询失败')
//     } else {
//         console.log(ret)
//     }
// })
// User.find({
//     username:'张三',
//     password: 123456
// },function (err,ret) {
//     if (err){
//         console.log('查询失败')
//     } else {
//         console.log(ret)
//     }
// })
// User.findOne({username:'张三'},function (err,ret) {
//     if (err){
//         console.log('查询失败')
//     } else {
//         console.log(ret)
//     }
// })

// 删除数据
// User.remove({
//     username:'张三'
// },function (err,ret) {
//     if (err){
//         console.log('删除失败')
//     } else {
//         console.log('删除成功')
//         console.log(ret)
//     }
// })

// 更新数据
// User.findByIdAndUpdate('5f151201ef3d19cca0bfe4ed',{
//     username: '张三'
// },function (err,data) {
//     if (err){
//         console.log('更新失败')
//     } else {
//         console.log('更新成功')
//     }
// })



User.findOne({
    username: 'aaa'
})
.then(function (data) {
    console.log(data)
    if (data){
        console.log('用户已存在')
    } else {
        console.log('用户不存在')
        return new User({
            username: 'aaa',
            password: '123',
            email: 'dasds'
        }).save()
    }
})
.then(function (ret) {
    console.log(ret)
})


User.findOne({username:'aaa'},function (data) {
    if (data){
        console.log('已存在')
    } else {
        new User({
            username:'aaa',
            password:'123',
            email:'dasdsd'
        }).save()
    }
})
