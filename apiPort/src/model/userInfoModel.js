const  mongoose=require('mongoose');

let Schema = mongoose.Schema;

let userInfoSchema=new Schema({
    userID:{type:String,required:true},
    userName:{type:String,required:true},
    userPass:{type:String,required:true},
    department:{type:String,required:true},
    birthday:{type:String},
    gender:{type:String},
    enteTime:{type:String},
    asState:{type:String},
    unitNumber:{type:String},
    unitName:{type:String},
    education:{type:String},
    highestDegree:{type:String},
    learnEdge:{type:String},
    technicalTitles:{type:String,required:true},
    subjectCategory:{type:String},
    politicsStatus:{type:String},
    national:{type:String},
    createTime:{type:String,required:true},
})

// 实例化绩效对象，生成绩效表
let userInfoModel=mongoose.model('UserInfos', userInfoSchema);

module.exports = userInfoModel




// const  mongoose=require('mongoose');
// const xlsx = require('node-xlsx');

// let Schema = mongoose.Schema;

// // 读取本地的xisx文件

// // 教职工基本信息表
// let sheets = xlsx.parse('C:/Users/Administrator/Desktop/biye/date/userInfo.xlsx');

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
//     titleKey[title[k]] = {type:String,required:true};
//     titleKey.createTime = {type:String,required:true};
// }
// // 实例化绩效对象，生成绩效表
// let userInfoSchema=new Schema(titleKey)
// let userInfoModel=mongoose.model('UserInfos', userInfoSchema);

// // 插入数据
// let contentData = [];
// let insertData = newSheet.content;
// for (var i = 0; i < insertData.length; i++) {
//     let newData = insertData[i]
//     let obj = {};
//     for (var j = 0; j < title.length; j++) {
//         let createTime = new Date(parseInt(new Date().getTime())).toLocaleString().replace(/:\d{1,2}$/,' ');
//         obj[title[j]] = newData[j];
//         obj.createTime = createTime;
//     }
//     var newContentData = new userInfoModel(obj);
//     newContentData.save(function(err,ret){
//         if(err){
//             console.log(err)
//         }else{
//             console.log(ret)
//         }
//     })
//     contentData.push(obj)
// }
 

// module.exports = userInfoModel