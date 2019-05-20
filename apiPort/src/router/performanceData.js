const express = require('express');
const Router = express.Router();

const performanceDataModel = require('../model/performanceDataModel.js');
const returnInfo = require('../utils/returnInfo')

// 查找所有绩效
Router.get('/findAll',(req,res)=>{
    performanceDataModel.find()
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
});

// 根据类型编号查找当前用户的当前类型的所有绩效
Router.get('/findByCode',(req,res)=>{
    let {user,typeCode} = req.query;
    performanceDataModel.find({belongsUser:user,typeCode:typeCode})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
});

// 根据审核状态查找当前审核组织的绩效信息
Router.get('/findByStatus',(req,res)=>{
    let {role,department,auditStatus} = req.query;
    if(role === '教研室主任审核') {
        if(auditStatus !== '未审核' && auditStatus !== '已通过审核') {
            performanceDataModel.find({belongsDepartment:department,directorAudit:{"$nin":["未审核","已通过审核"]}})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        } else {
            performanceDataModel.find({belongsDepartment:department,directorAudit:auditStatus})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        }
    }
    if(role === '绩效小组审核') {
        if(auditStatus !== '未审核' && auditStatus !== '已通过审核') {
            performanceDataModel.find({directorAudit:'已通过审核',performanceAudit:{"$nin":["未审核","已通过审核"]}})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        } else {
            performanceDataModel.find({directorAudit:'已通过审核',performanceAudit:auditStatus})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        }
    }
    if(role === '领导审核') {
        if(auditStatus !== '未审核' && auditStatus !== '已通过审核') {
            performanceDataModel.find({directorAudit:'已通过审核',performanceAudit:'已通过审核',leaderAudit:{"$nin":["未审核","已通过审核"]}})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        } else {
            performanceDataModel.find({directorAudit:'已通过审核',performanceAudit:'已通过审核',leaderAudit:auditStatus})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        }
    }
});

// 插入或者修改绩效信息
Router.post('/insertData',(req,res)=>{
    let {
        performanceID,
        belongsUser,
        belongsDepartment,
        typeCode, 
        typeName, 
        content, 
        workload, 
        coefficient, 
        subtotal,
        directorAudit,
        performanceAudit,
        leaderAudit
    } = req.body.paramsData;
    performanceDataModel.find({performanceID:performanceID})
    .then(result => {
        let createTime = new Date(parseInt(new Date().getTime())).toLocaleString().replace(/:\d{1,2}$/,' ');
        if(result.length > 0) {
            performanceDataModel.update(
                {performanceID:performanceID},
                {$set:{
                    typeName: typeName,
                    content: content,
                    workload: workload,
                    coefficient: coefficient,
                    subtotal: subtotal,
                    createTime: createTime
                }}
            )
            .then((data)=>{
                return res.send(returnInfo.returnData(0,'修改成功',data))
            })
            .catch(err => {
                return res.send(returnInfo.returnData(-1,'修改失败',err))
            })
        } else {
            performanceDataModel.insertMany({
                performanceID,
                belongsUser,
                belongsDepartment,
                typeCode, 
                typeName, 
                content, 
                workload, 
                coefficient, 
                subtotal,
                directorAudit,
                performanceAudit,
                leaderAudit,
                createTime
            })
            .then((data)=>{
                return res.send(returnInfo.returnData(0,'添加成功',data))
            })
            .catch(err => {
                return res.send(returnInfo.returnData(-1,'添加失败',err))
            })
        }
    })
});

// 删除绩效信息
Router.post('/deleteData',(req,res)=>{
    let {id} = req.body;
    if (!id) {res.send(returnInfo.returnData(-1,'failure',err))}
    performanceDataModel.deleteOne({performanceID:id})
    .then((data)=>{
        return res.send(returnInfo.returnData(0,'success',data))
    })
    .catch(err => {
        res.send(returnInfo.returnData(-1,'failure',err))
    })
});

// 根据教师名字查找所属的绩效信息
Router.get('/findByUserName',(req,res)=>{
    let {role,userName,auditStatus} = req.query;
    if(role === '教研室主任审核') {
        if(auditStatus !== '未审核' && auditStatus !== '已通过审核') {
            performanceDataModel.find({belongsUser:userName,directorAudit:{"$nin":["未审核","已通过审核"]}})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        } else {
            performanceDataModel.find({belongsUser:userName,directorAudit:auditStatus})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        }
        
    }
    if(role === '绩效小组审核') {
        if(auditStatus !== '未审核' && auditStatus !== '已通过审核') {
            performanceDataModel.find({belongsUser:userName,directorAudit:'已通过审核',performanceAudit:{"$nin":["未审核","已通过审核"]}})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        } else {
            performanceDataModel.find({belongsUser:userName,directorAudit:'已通过审核',performanceAudit:auditStatus})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        }

        
    }
    if(role === '领导审核') {
        if(auditStatus !== '未审核' && auditStatus !== '已通过审核') {
            performanceDataModel.find({belongsUser:userName,directorAudit:'已通过审核',performanceAudit:'已通过审核',leaderAudit:{"$nin":["未审核","已通过审核"]}})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        } else {
            performanceDataModel.find({belongsUser:userName,directorAudit:'已通过审核',performanceAudit:'已通过审核',leaderAudit:auditStatus})
            .then((data)=>{
                if( data.length > 0 ) {
                    return res.send(returnInfo.returnData(0,'success',data))
                }
                res.send(returnInfo.returnData(-1,'failure',data))
            })
        }

        
    }
});

// 根据绩效ID修改审核状态
Router.post('/chageAuditStatus',(req,res)=>{
    let {role,performanceID,result} = req.body;
    if(role === '教研室主任审核') {
        performanceDataModel.find({performanceID:performanceID})
        .then((data)=>{
            if( data.length > 0 ) {
                performanceDataModel.update(
                    {performanceID:performanceID},
                    {$set:{
                        directorAudit:result
                    }}
                )
                .then((dat)=>{
                    res.send(returnInfo.returnData(0,'success',dat))
                })
                .catch(err => {
                    res.send(returnInfo.returnData(-1,'failure',err))
                })
            } else {
                res.send(returnInfo.returnData(-1,'failure',data))
            }
        })
    }
    if(role === '绩效小组审核') {
        performanceDataModel.find({performanceID:performanceID})
        .then((data)=>{
            if( data.length > 0 ) {
                performanceDataModel.update(
                    {performanceID:performanceID},
                    {$set:{
                        performanceAudit:result
                    }}
                )
                .then((dat)=>{
                    res.send(returnInfo.returnData(0,'success',dat))
                })
                .catch(err => {
                    res.send(returnInfo.returnData(-1,'failure',err))
                })
            } else {
                res.send(returnInfo.returnData(-1,'failure',data))
            }
        })
    }
    if(role === '领导审核') {
        performanceDataModel.find({performanceID:performanceID})
        .then((data)=>{
            if( data.length > 0 ) {
                performanceDataModel.update(
                    {performanceID:performanceID},
                    {$set:{
                        leaderAudit:result
                    }}
                )
                .then((dat)=>{
                    res.send(returnInfo.returnData(0,'success',dat))
                })
                .catch(err => {
                    res.send(returnInfo.returnData(-1,'failure',err))
                })
            } else {
                res.send(returnInfo.returnData(-1,'failure',data))
            }
        })
    } 
});

// 根据类型编号和工作内容查找所有绩效
Router.get('/findByContent',(req,res)=>{
    let {content,typeCode} = req.query;
    performanceDataModel.find({content:content,typeCode:typeCode})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
});

module.exports = Router;