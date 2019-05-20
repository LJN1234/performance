const  mongoose=require('mongoose')
let Schema = mongoose.Schema;

let performanceDataSchema=new Schema({
    performanceID:{type:String,required:true},
    belongsUser:{type:String,required:true},
    belongsDepartment:{type:String,required:true},
    typeCode:{type:Number,required:true},
    typeName:{type:String,required:true},
    content:{type:String,required:true},
    workload:{type:Number,required:true},
    coefficient:{type:Number,required:true},
    subtotal:{type:Number,required:true},
    directorAudit:{type:String,required:true},
    performanceAudit:{type:String,required:true},
    leaderAudit:{type:String,required:true},
    createTime:{type:String,required:true},
})

let performanceDataModel=mongoose.model('performanceDatas', performanceDataSchema);

module.exports = performanceDataModel