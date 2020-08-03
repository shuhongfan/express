var fs=require('fs')

// console.log(1)

var p1=new Promise(function (resolve, reject) {
    // console.log(2)
    fs.readFile('./data/a.txt','utf8',function (err,data) {
        if (err){
            console.log(err)
            // 把容器的pending状态改为rejected
            reject(err)
        } else {
            // console.log(3)
            // console.log(data)
            // 把容器的pending状态改为成功resolved
            resolve(data)
        }
    })
})
var p2=new Promise(function (resolve, reject) {
    // console.log(2)
    fs.readFile('./data/b.txt','utf8',function (err,data) {
        if (err){
            console.log(err)
            // 把容器的pending状态改为rejected
            reject(err)
        } else {
            // console.log(3)
            // console.log(data)
            // 把容器的pending状态改为成功resolved
            resolve(data)
        }
    })
})
var p3=new Promise(function (resolve, reject) {
    // console.log(2)
    fs.readFile('./data/c.txt','utf8',function (err,data) {
        if (err){
            console.log(err)
            // 把容器的pending状态改为rejected
            reject(err)
        } else {
            // console.log(3)
            // console.log(data)
            // 把容器的pending状态改为成功resolved
            resolve(data)
        }
    })
})

// console.log(4)

p1
    .then(function (data) {
        console.log(data)
        return p2
    },function (err) {
        console.log(err)
    })
    .then(function (data) {
        console.log(data)
        return p3
    })
    .then(function (data) {
        console.log(data)
    })
