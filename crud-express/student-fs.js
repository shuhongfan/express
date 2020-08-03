var fs=require('fs')
var dbPath='./db.json'

// 获取学生列表
exports.find=function (callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        callback(null,students)
    })
}
// 根据id获取学生对象
exports.findById=function(id,callback){
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        var ret=students.find(function (item) {
            return item.id===parseInt(id)
        })
        callback(null,ret)
    })
}
// 保存学生列表
exports.save=function (student,callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        // 处理id为唯一的 不重复
        student.id=students[students.length-1].id+1
        students.unshift(student)
        var fileDate=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileDate,function (err) {
            if (err){
                return callback(err)
            }
            callback(null)
        })
    })
}

// 更新学生根据id
exports.updateById=function (student,callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        student.id=parseInt(student.id)
        var stu=students.find(function (item) {
            return item.id===student.id
        })
        // stu.name=student.name
        // stu.age=student.age
        for(var key in student){
            stu[key]=student[key]
        }
        var fileDate=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileDate,function (err) {
            if (err){
                return callback(err)
            }
            callback(null)
        })
    })
}
// 删除学生 根据id
exports.deleteById=function (id,callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        var deleteId=students.findIndex(function (item) {
            return item.id===parseInt(id)
        })
        students.splice(deleteId,1)
        var fileDate=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileDate,function (err) {
            if (err){
                return callback(err)
            }
            callback(null)
        })
    })
}
