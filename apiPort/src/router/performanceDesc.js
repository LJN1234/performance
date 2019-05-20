const express = require('express');
const Router = express.Router();

const performanceDescModel = require('../model/performanceDescModel.js');
const returnInfo = require('../utils/returnInfo')

// 查找所有的绩效类型信息
Router.get('/findAll',(req,res)=>{
    performanceDescModel.find()
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
})

// 根据类型编号查找绩效类型信息
Router.get('/findByType',(req,res)=>{
    let {typeCode} = req.query;
    performanceDescModel.find({typeCode:typeCode})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
})

// 根据id查找绩效类型信息
Router.get('/findById',(req,res)=>{
    let {id} = req.query;
    performanceDescModel.find({_id:id})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
})

// 添加绩效类型信息
Router.post('/addTypeDesc',(req,res)=>{
    let {
        typeCode,
        typeName,
        projectName,
        workload,
    } = req.body;
    let createTime = new Date(parseInt(new Date().getTime())).toLocaleString().replace(/:\d{1,2}$/,' ');
    performanceDescModel.insertMany({
        typeCode,
        typeName,
        projectName,
        workload,
        createTime,
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
Router.post('/updateTypeDesc',(req,res)=>{
    let {
        id,
        typeCode,
        typeName,
        projectName,
        workload,
    } = req.body;
    performanceDescModel.find({_id:id})
    .then((data)=>{
        if( data.length > 0 ) {
            performanceDescModel.update(
                {_id:id},
                {$set:{
                    typeCode: typeCode,
                    typeName: typeName,
                    projectName: projectName,
                    workload: workload,
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

// 根据id删除某一条绩效类型信息
Router.post('/deleteTypeDesc',(req,res)=>{
    let {id} = req.body;
    if (!id) {res.send(returnInfo.returnData(-1,'failure',err))}
    performanceDescModel.deleteOne({_id:id})
    .then((data)=>{
        return res.send(returnInfo.returnData(0,'success',data))
    })
    .catch(err => {
        res.send(returnInfo.returnData(-1,'failure',err))
    })
});

//根据id删除多条绩效类型信息
Router.post('/deleteManyTypeDesc',(req,res)=>{
	let arr=req.body.ids;
	var ids = JSON.parse(arr)
	console.log(ids.ids);
	if (arr.length<=0) {res.send(util.sendData(-1,'参数错误',null))}
	performanceDescModel.remove({_id:{$in:ids.ids}})
	.then((data)=>{
        res.send(returnInfo.returnData(0,'success',data))
	})
	.catch((err)=>{
		res.send(returnInfo.returnData(-1,'failure',err))
	})
})

module.exports = Router;