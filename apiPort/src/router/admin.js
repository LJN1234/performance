const express = require('express');
const Router = express.Router();

const returnInfo = require('../utils/returnInfo');
const adminModel = require('../model/adminModel.js');;

// 管理员登录
Router.post('/login',(req,res)=>{
    let {userID,userPass} = req.body;
    adminModel.find({userID,userPass})
    .then((data)=>{
        console.log(data)
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'用户名或密码错误，请重新输入',data))
    })
});

// 查询所有的管理员
Router.get('/findAdminByAll',(req,res)=>{
    adminModel.find()
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'查询失败，请重试',data))
    })
});

// 根据id查询管理员
Router.post('/findAdminById',(req,res)=>{
    let {userID} = req.body;
    adminModel.find({userID:userID})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'查询失败，请重试',data))
    })
});

// 添加管理员
Router.post('/addAdmin',(req,res)=>{
    let {userID,userName,permissions} = req.body;
    adminModel.find({userID:userID})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'该教师已是管理员，请勿重复添加！',data))
        }
        let createTime = new Date(parseInt(new Date().getTime())).toLocaleString().replace(/:\d{1,2}$/,' ');
        adminModel.insertMany({
            userID:userID,
            userName:userName,
            userPass:userID,
            permissions:permissions,
            createTime:createTime
        })
        .then((data)=>{
            return res.send(returnInfo.returnData(0,'success',data))
        })
        .catch(err => {
            return res.send(returnInfo.returnData(-1,'添加失败',err))
        })
    })
});

// 修改管理员
Router.post('/updateAdmin',(req,res)=>{
    let {userID,userName,userPass,permissions} = req.body;
    adminModel.find({userID:userID})
    .then((data)=>{
        if( data.length > 0 ) {
            let createTime = new Date(parseInt(new Date().getTime())).toLocaleString().replace(/:\d{1,2}$/,' ');
            adminModel.update(
                {userID:userID},
                {$set:{
                    userName:userName,
                    userPass:userID,
                    userPass:userPass,
                    permissions:permissions,
                    createTime:createTime
                }}
            )
            .then((dat)=>{
                return res.send(returnInfo.returnData(0,'success',dat))
            })
            res.send(returnInfo.returnData(-1,'修改失败，请重试',dat))
        }
    })
});

// 删除管理员--一个
Router.post('/deleteAdmin',(req,res)=>{
    let {userID} = req.body;
    if (!userID) {res.send(returnInfo.returnData(-1,'参数错误',err))}
    adminModel.deleteOne({userID:userID})
    .then((data)=>{
        return res.send(returnInfo.returnData(0,'success',data))
    })
    .catch(err => {
        res.send(returnInfo.returnData(-1,'failure',err))
    })
});

// 删除管理员-=多个
Router.post('/deleteManyAdmin',(req,res)=>{
    console.log(req.body.tem);
	let arr=req.body.userIds;
	var userIds = JSON.parse(arr)
	console.log(userIds.userIds);
	if (arr.length<=0) {res.send(util.sendData(-1,'参数错误',null))}
	adminModel.remove({userID:{$in:userIds.userIds}})
	.then((data)=>{
        res.send(returnInfo.returnData(0,'success',data))
	})
	.catch((err)=>{
		res.send(returnInfo.returnData(-1,'failure',err))
	})
})

module.exports = Router;