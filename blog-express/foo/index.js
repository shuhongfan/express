var fs=require('fs')
var path=require('path')

console.log(__dirname+'/a.txt')
console.log(path.join(__dirname,'a.txt'))

fs.readFile(path.join(__dirname,'a.txt'),'utf8',function (err,data) {
    if (err){
        throw  err
    }
    console.log(data)
})
