const express = require('express');
const Router = express.Router();

const returnInfo = require('../utils/returnInfo');
const reviewersModel = require('../model/reviewersModel.js');

Router.get('/findAll',(req,res)=>{
    reviewersModel.find()
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
})

Router.get('/findByUserID',(req,res)=>{
    let {userID} = req.query;
    reviewersModel.find({userID:userID})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
})

Router.post('/findById',(req,res)=>{
    let {_id} = req.body;
    reviewersModel.find({_id:_id})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
})

Router.post('/addReviewer',(req,res)=>{
    let {
        userID,
        userName,
        chairman,
        performanceTeam,
        leadership
    } = req.body;
    let createTime = new Date(parseInt(new Date().getTime())).toLocaleString().replace(/:\d{1,2}$/,' ');
    reviewersModel.insertMany({
        userID,
        userName,
        chairman,
        performanceTeam,
        leadership,
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

// 修改绩效类型信息 
Router.post('/updateReviewer',(req,res)=>{
    console.log(req.body)
    let {
        _id,
        userID,
        userName,
        chairman,
        performanceTeam,
        leadership,
    } = req.body;
    reviewersModel.find({_id:_id})
    .then((data)=>{
        if( data.length > 0 ) {
            let createTime = new Date(parseInt(new Date().getTime())).toLocaleString().replace(/:\d{1,2}$/,' ');
            reviewersModel.update(
                {_id:_id},
                {$set:{
                    userID,
                    userName,
                    chairman,
                    performanceTeam,
                    leadership,
                    createTime
                }}
            )
            .then((dat)=>{
                return res.send(returnInfo.returnData(0,'success',dat))
            })
            .catch(err => {
                return res.send(returnInfo.returnData(-1,'failure',err))
            })
        }
    })
});

// 根据id删除某一条绩效类型信息
Router.post('/deleteReviewer',(req,res)=>{
    let {_id} = req.body;
    if (!_id) {res.send(returnInfo.returnData(-1,'failure',err))}
    reviewersModel.deleteOne({_id:_id})
    .then((data)=>{
        return res.send(returnInfo.returnData(0,'success',data))
    })
    .catch(err => {
        res.send(returnInfo.returnData(-1,'failure',err))
    })
});

//根据id删除多条绩效类型信息
Router.post('/deleteManyReviewer',(req,res)=>{
	let arr=req.body.ids;
    var ids = JSON.parse(arr)
	if (arr.length<=0) {res.send(util.sendData(-1,'参数错误',null))}
	reviewersModel.remove({_id:{$in:ids.ids}})
	.then((data)=>{
        res.send(returnInfo.returnData(0,'success',data))
	})
	.catch((err)=>{
		res.send(returnInfo.returnData(-1,'failure',err))
	})
})


module.exports = Router;