var mysql = require('mysql');

// 创建连接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'itcast'
});

// 连接数据库 打开冰箱门
connection.connect();

// 执行数据库操作
connection.query('INSERT INTO `users` VALUES(1,"admin","123456")', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.query('SELECT * FROM `users`', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

// 关闭连接
connection.end();
