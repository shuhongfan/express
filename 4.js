const mongoose = require('mongoose');

// 连接Mongodb数据库
mongoose.connect('mongodb://localhost/test');

// 创建一个模型 设计数据库
const Cat = mongoose.model('Cat', { name: String });

for (var i = 0; i < 100; i++) {
    // 实例化一个cat
    const kitty = new Cat({ name: 'Zildjian'+i });

// 持久化保存kitty实例
    kitty.save().then(() => console.log('meow'));
}

