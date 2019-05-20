const express = require('express');
const Router = express.Router();

const returnInfo = require('../utils/returnInfo');
const userInfoModel = require('../model/userInfoModel.js');;

// 教师登录
Router.post('/login',(req,res)=>{
    let {userID,userPass} = req.body;
    userInfoModel.find({userID,userPass})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
});

// 查找所有教师
Router.get('/findAll',(req,res)=>{
    // let {id} = req.query;
    userInfoModel.find()
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
});

// 根据用户ID查找教师
Router.post('/findById',(req,res)=>{
    let {id} = req.body;
    userInfoModel.find({userID:id})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
});

// 根据用户名查找教师
Router.get('/findByName',(req,res)=>{
    let {userName} = req.query;
    userInfoModel.find({userName:userName})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
});

// 根据教研室查找教师
Router.get('/findByDepartment',(req,res)=>{
    let {department,stateId} = req.query;
    userInfoModel.find({department:department})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
});

// 添加教师
Router.post('/addTeacher',(req,res)=>{
    let {
        userID,
        userName,
        userPass,
        department,
        gender,
        birthday,
        enteTime,
        asState,
        unitNumber,
        unitName,
        education,
        highestDegree,
        learnEdge,
        technicalTitles,
        subjectCategory,
        politicsStatus,
        national,
    } = req.body;
    let createTime = new Date(parseInt(new Date().getTime())).toLocaleString().replace(/:\d{1,2}$/,' ');
    userInfoModel.insertMany({
        userID,
        userName,
        userPass,
        department,
        gender,
        birthday,
        enteTime,
        asState,
        unitNumber,
        unitName,
        education,
        highestDegree,
        learnEdge,
        technicalTitles,
        subjectCategory,
        politicsStatus,
        national,
        createTime
        }
    )
    .then((data)=>{
        return res.send(returnInfo.returnData(0,'success',data))
    })
    .catch(err => {
        return res.send(returnInfo.returnData(-1,'failure',err))
    })
});

// 修改教师信息 
Router.post('/updateTeacher',(req,res)=>{
    let {
        userID,
        userName,
        userPass,
        department,
        gender,
        birthday,
        enteTime,
        asState,
        unitNumber,
        unitName,
        education,
        highestDegree,
        learnEdge,
        technicalTitles,
        subjectCategory,
        politicsStatus,
        national,
    } = req.body;
    userInfoModel.find({userID:userID})
    .then((data)=>{
        if( data.length > 0 ) {
            userInfoModel.update(
                {userID:userID},
                {$set:{
                    userName: userName,
                    userPass: userPass,
                    department: department,
                    gender: gender,
                    birthday: birthday,
                    enteTime: enteTime,
                    asState: asState,
                    unitNumber: unitNumber,
                    unitName: unitName,
                    education: education,
                    highestDegree: highestDegree,
                    learnEdge: learnEdge,
                    technicalTitles: technicalTitles,
                    subjectCategory: subjectCategory,
                    politicsStatus: politicsStatus,
                    national: national,
                }}
            )
            .then((data)=>{
                return res.send(returnInfo.returnData(0,'success',data))
            })
            .catch(err => {
                return res.send(returnInfo.returnData(-1,'failure',err))
            })
        }
    })
});

// 根据id删除某一教师
Router.post('/deleteTeacher',(req,res)=>{
    let {id} = req.body;
    if (!id) {res.send(returnInfo.returnData(-1,'参数错误',err))}
    userInfoModel.deleteOne({userID:id})
    .then((data)=>{
        return res.send(returnInfo.returnData(0,'success',data))
    })
    .catch(err => {
        res.send(returnInfo.returnData(-1,'failure',err))
    })
});

//根据id删除多个教师
Router.post('/deleteManyTeacher',(req,res)=>{
	let arr=req.body.ids;
	var ids = JSON.parse(arr)
	// console.log(ids.ids);
	if (arr.length<=0) {res.send(util.sendData(-1,'参数错误',null))}
	userInfoModel.remove({userID:{$in:ids.ids}})
	.then((data)=>{
        res.send(returnInfo.returnData(0,'success',data))
	})
	.catch((err)=>{
		res.send(returnInfo.returnData(-1,'failure',err))
	})
})


module.exports = Router;