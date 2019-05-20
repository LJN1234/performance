const  mongoose=require('mongoose');

let Schema = mongoose.Schema;

let performanceDescSchema=new Schema({
    typeCode:{type:String,required:true},
    typeName:{type:String,required:true},
    projectName:{type:String,required:true},
    workload:{type:String,required:true},
    createTime:{type:String,required:true},
})

// 实例化绩效对象，生成绩效表
let performanceDescModel=mongoose.model('PerformanceDescs', performanceDescSchema);
 

module.exports = performanceDescModel