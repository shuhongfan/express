var arr=[{ phone: '13437191068', code: 5604 }]

var status=arr.some(item=>{
    return +item.phone===13437191068 && item.code===5604
})

console.log(status)

