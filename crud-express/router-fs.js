var fs=require('fs')

var express=require('express')

// 创建一个路由容器
var router=express.Router()

var Student=require('./student.js')

// 把路由挂载到router路由器中
router.get('/',function (req,res) {
    // fs.readFile('./db.json','utf8',function (err,data) {
    //     if (err){
    //         return res.status(500).send('Server error')
    //     }
    //     // console.log(data)
    //     // console.log(data.toString())
    //     var students=JSON.parse(data).students
    //     res.render('index.html',{
    //         fruits:[
    //             '苹果',
    //             '香蕉',
    //             '橘子'
    //         ],
    //         students: students
    //     })
    // })
    Student.find(function (err,students) {
        if (err){
            return res.status(500).send('server error')
        }
        res.render('index.html',{
            fruits:[
                '苹果',
                '香蕉',
                '橘子'
            ],
            students: students
        })
    })
})
router.get('/students/new',function (req,res) {
    res.render('new.html')
})
router.get('/students/edit',function (req,res) {
    console.log(req.query)
    Student.findById(parseInt(req.query.id),function (err,data) {
        if (err){
            return res.status(500).send('server error')
        }
        console.log(data)
        res.render('edit.html',{
            student:data
        })
    })
})
router.post('/students/edit',function (req,res) {
    console.log(req.body)
    // 先读取出来 转成对象 push 转字符串 存储
    Student.updateById(req.body,function (err) {
        if (err){
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})
router.post('/students/new',function (req,res) {
    Student.updateById(req.body,function (err) {
        if (err){
            return console.log('修改失败')
        }
        console.log('修改成功')
    })
})
router.get('/students/delete',function (req,res) {
    console.log(req.query)
    Student.deleteById(req.query.id,function (err) {
        if (err){
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})
// 导出router
module.exports=router

// module.exports=function(app){
//     app.get('/',function (req,res) {
//         fs.readFile('./db.json','utf8',function (err,data) {
//             if (err){
//                 return res.status(500).send('Server error')
//             }
//             // console.log(data)
//             // console.log(data.toString())
//             var students=JSON.parse(data).students
//             res.render('index.html',{
//                 fruits:[
//                     '苹果',
//                     '香蕉',
//                     '橘子'
//                 ],
//                 students: students
//             })
//         })
//     })
//
//     app.get('/students/new',function (req,res) {
//
//     })
// }

