const  mongoose=require('mongoose');

let Schema = mongoose.Schema;

let reviewersSchema=new Schema({
    userID:{type:String,required:true},
    userName:{type:String,required:true},
    chairman:{type:String,required:true},
    performanceTeam:{type:String,required:true},
    leadership:{type:String,required:true},
    createTime:{type:String,required:true},
})
// 实例化绩效对象，生成绩效表
let reviewersModel=mongoose.model('reviewers', reviewersSchema);

module.exports = reviewersModel
