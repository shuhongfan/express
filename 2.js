var users=[
    {id:1,name:'张三'},
    {id:2,name:'张三'},
    {id:3,name:'张三'},
    {id:4,name:'张三'}
]

var arr=users.map(function (ele,index) {
    return {
        id:ele.id+10+"--员工",
        name:ele.name+'sdahgsa'
    }
})
console.log(arr)

Array.prototype.myFind=function (conditionFunc) {
    for (var i=0;i<this.length;i++){
        if (conditionFunc(this[i],i)){
            return this[i]
        }
    }
}

var ret=users.myFind(function (item,index) {
    return item.id===4
})

console.log(ret)



console.log([1,32,3].reduce((prev,curr)=>{
    return prev+curr
}))

