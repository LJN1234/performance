const express = require('express');
const Router = express.Router();

const returnInfo = require('../utils/returnInfo');
const positionModel = require('../model/positionModel.js');

Router.get('/findByUserID',(req,res)=>{
    let {userName} = req.query;
    // console.log(userName)
    positionModel.find({userName:userName})
    .then((data)=>{
        if( data.length > 0 ) {
            return res.send(returnInfo.returnData(0,'success',data))
        }
        res.send(returnInfo.returnData(-1,'failure',data))
    })
})


module.exports = Router;