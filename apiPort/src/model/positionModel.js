const  mongoose=require('mongoose');

let Schema = mongoose.Schema;

let positionSchema=new Schema({
    userID:{type:String,required:true},
    userName:{type:String,required:true},
    chairman:{type:String,required:true},
    performanceTeam:{type:String,required:true},
    leadership:{type:String,required:true},
})
// 实例化绩效对象，生成绩效表
let positionModel=mongoose.model('Positions', positionSchema);

module.exports = positionModel

// const  mongoose=require('mongoose');
// const xlsx = require('node-xlsx');

// let Schema = mongoose.Schema;

// // 读取本地的xisx文件
// // 职位表
// let sheets = xlsx.parse('C:/Users/Administrator/Desktop/biye/date/position.xlsx');

// let newSheet = {title:'',header:[],content:[]}
// // 循环所有的sheet工作表，取出里面的数据
// sheets.forEach(function(sheet){
//     newSheet.title=sheet['name'];
//     for(var rowId in sheet['data']){
//         var row=sheet['data'][rowId];
//         if(rowId === "0") {
//             newSheet.header.push(row)
//         } else {
//             newSheet.content.push(row)
//         }
//     }
// });

// // 处理绩效表的字段，即表头
// let titleKey={};  // 存放表头字段
// let title = newSheet.header[0];
// for (var k = 0; k < title.length; k++) {
//     titleKey[title[k]] = {type:String,required:true}
// }
// // 实例化绩效对象，生成绩效表
// let positionSchema=new Schema(titleKey)
// let positionModel=mongoose.model('Positions', positionSchema);

// // 插入数据
// let contentData = [];
// let insertData = newSheet.content;
// for (var i = 0; i < insertData.length; i++) {
//     let newData = insertData[i]
//     let obj = {};
//     for (var j = 0; j < title.length; j++) {
//         obj[title[j]] = newData[j]
//     }
//     var newContentData = new positionModel(obj);
//     newContentData.save(function(err,ret){
//         if(err){
//             console.log(err)
//         }else{
//             console.log(ret)
//         }
//     })
//     contentData.push(obj)
// }
 

// module.exports = positionModel