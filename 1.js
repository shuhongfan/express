function fn(callback) {
    setTimeout(function () {
        var data='hello'
        callback(data)
    },1000)
}

fn(function (data) {
    console.log(data)
})


function add(x,y,callback) {
    setTimeout(function () {
        var ret=x+y
        callback(ret)
    },1000)
}

add(10,20,function (ret) {
    console.log(ret)
})
