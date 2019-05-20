const mongoose=require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost:27017/taskRelease',{ useNewUrlParser:true});
// 创建数据库实例对象
let db = mongoose.connection;
// 监听数据库连接错误
db.on('error',()=>{
    console.log('连接失败')
});
// 监听数据库连接成功
db.on('open',()=>{
    console.log('连接成功')
})
db.on('disconnected', function () {
    console.log('数据库连接断开');
})
