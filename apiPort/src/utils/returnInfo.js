// 构建返回数据
function returnData(status,msg,data) {
    return {
        status:status,
        msg:msg,
        data:data
    }
}

module.exports = { returnData };