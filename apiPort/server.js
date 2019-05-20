const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path=require('path');
const db = require('./src/dbconnect.js');

//post参数解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* 
    *  开启静态文件：
    *  开启前端页面系统
    *  开启后台管理系统
*/ 
app.use('/pageSystem',express.static(path.join(__dirname,'../pageSystem')))
app.use('/',express.static(path.join(__dirname,'../manageSystem')))

/* 
    *  api接口：
    *  教师信息接口
    *  绩效描述接口
    *  教师职位接口
    *  教师所填写的绩效信息接口
    *  管理员接口
*/ 
app.use('/api/userInfo',require('./src/router/userInfo.js'));
app.use('/api/performanceDesc',require('./src/router/performanceDesc.js'));
app.use('/api/position',require('./src/router/position.js'));
app.use('/api/performanceData',require('./src/router/performanceData.js'));
app.use('/api/admin',require('./src/router/admin.js'));

// 监听8000端口，判断服务器是否启动
app.listen(8000,()=>{
    console.log('服务器已启动')
})