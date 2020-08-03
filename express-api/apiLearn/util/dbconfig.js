const mysql=require('mysql')
module.exports={
    // 数据库配置
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'express-api'
    },
    // 连接数据库 使用mysql连接池连接
    sqlConnect:function (sql,sqlArr,callBack) {
        var pool=mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            // console.log(err,conn)
            if (err){
                console.log('连接失败')
                return false
            }
            // 事件驱动回调
            conn.query(sql,sqlArr,callBack)
            // 释放连接
            conn.release()
        })
    },
    // promise回调
    SySqlConnect:function (sySql,sqlArr) {
        return new Promise(((resolve, reject) => {
            var pool=mysql.createPool(this.config)
            pool.getConnection((err,conn)=>{
                // console.log(err,conn)
                if (err){
                    reject('连接失败')
                }else {
                    // 事件驱动回调
                    conn.query(sySql,sqlArr,(err,data)=>{
                        if (err){
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    })
                    // 释放连接
                    conn.release()
                }
            })
        })).catch((err)=>{
            console.log(err)
        })
    }
}
