const  mongoose=require('mongoose')
let Schema = mongoose.Schema;

let adminSchema=new Schema({
    userID:{type:String,required:true},
    userName:{type:String,required:true},
    userPass:{type:String,required:true},
    permissions:{type:String,required:true},
    createTime:{type:String,required:true},
})

let adminModel=mongoose.model('admins', adminSchema);

// 插入数据
// let newadmin = new adminModel({
//     userID:"20040440",
//     userName:"吴庆军",
//     userPass:"20040440",
//     permissions:"0",
//     createTime:"2009-5-5",
// });
// newadmin.save(function(err,ret){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(ret)
//     }
// })

module.exports = adminModel