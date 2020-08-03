var fs=require('fs')

var express=require('express')

// 创建一个路由容器
var router=express.Router()

var Student=require('./student.js')

// 把路由挂载到router路由器中
router.get('/',function (req,res) {

    Student.find(function (err,students) {
        // console.log(students)
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
    Student.findById(req.query.id,function (err,student) {
        if (err){
            return res.status(500).send('server error')
        }
        console.log(student)
        res.render('edit.html',{
            student:student
        })
    })
})
router.post('/students/edit',function (req,res) {
    Student.findByIdAndUpdate(req.body._id.replace(/"/g,''),req.body,function (err) {
        if (err){
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})
router.post('/students/new',function (req,res) {
    new Student(req.body).save(function (err) {
        if (err){
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})
router.get('/students/delete',function (req,res) {
    console.log(req.query.id)
    Student.findByIdAndRemove(req.query.id,function (err) {
        if (err){
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})
// 导出router
module.exports=router
