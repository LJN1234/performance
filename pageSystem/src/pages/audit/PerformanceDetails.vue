<template>
    <div id="performanceDetails">
        <div class="performanceDetails-title">
            <h4>基本信息：</h4>
            <div><label>姓名：</label><span>{{userInfo.userName}}</span></div>
            <div><label>职称：</label><span></span>{{userInfo.technicalTitles}}</div>
            <div><label>学科类别：</label><span>{{userInfo.subjectCategory}}</span></div>
            <div><label>单位名称：</label><span>{{userInfo.unitName}}</span></div>
            <div><label>人事编号：</label><span>{{userInfo.userID}}</span></div>
            <div><label>奖励性绩效合计：</label><span>{{summation}}</span></div> 
        </div>
        <div class="performanceDetails-contain">
            <h4>绩效信息：</h4>
            <el-table size="mini" :data="tableData" style="width: 100%">
                <el-table-column label="类目" width="240">
                    <template slot-scope="scope"><span style="margin-left: 10px">{{ scope.row.typeName }}</span></template>
                </el-table-column>
                <el-table-column label="工作内容">
                    <template slot-scope="scope"><span style="margin-left: 10px">{{ scope.row.content }}</span></template>
                </el-table-column>
                <el-table-column label="系数" width="100">
                    <template slot-scope="scope"><span style="margin-left: 10px">{{ scope.row.coefficient }}</span></template>
                </el-table-column>
                <el-table-column label="工作量" width="100">
                    <template slot-scope="scope"><span style="margin-left: 10px">{{ scope.row.workload }}</span></template>
                </el-table-column>
                <el-table-column label="小计" width="100">
                    <template slot-scope="scope"><span style="margin-left: 10px">{{ scope.row.subtotal }}</span></template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleResult(scope.row,'已通过审核')">同意</el-button>
                        <el-popover placement="bottom" :v-model="visible" width="320" title="请写下你不同意的理由：" >
                            <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea"></el-input>
                            <div style="text-align: right; margin: 0">
                                <el-button type="primary" size="mini" @click="handleResult(scope.row,'未通过审核')">确定</el-button>
                            </div>
                            <el-button size="mini" type="danger" slot="reference">不同意</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "PerformanceDetails",
    data() {
        return {
            userName: '',
            visible2: false,
            userInfo: [],
            summation:0,
            visible: false,
            tableData: [],
            textarea: '',
        };
    },
    methods: {
        // 获取教师详细信息
        getUserInfo(userName) {
            this.$axios.get("/myapi/api/userInfo/findByName?t="+ (new Date()).getTime().toString(),
                {params:{userName:userName}})
            .then(data => {
                if(data.data.msg === "success") {
                    this.userInfo = data.data.data[0];
                } else {
                    this.$message.error('很遗憾，查询失败，请重试！');
                }
            })
        },
        getPerformance(){
            this.$axios.get("/myapi/api/performanceData/findByUserName?t="+ (new Date()).getTime().toString(),
            {params:{
                userName:this.$route.query.userName,
                auditStatus:this.$route.query.auditStatus,
                role:this.$route.query.roleTitle
            }})
            .then(data => {
                this.tableData = data.data.data;
                this.tableData.map(item => {
                    this.summation +=  item.subtotal;
                });
            })
        },
        handleResult(row,result) {
            if(result === '未通过审核') {
                result = this.textarea;
            }
            this.$axios.post("/myapi/api/performanceData/chageAuditStatus?t="+ (new Date()).getTime().toString(),
            {role:this.$route.query.roleTitle,performanceID:row.performanceID,result:result})
            .then(data => {
                console.log(data)
                if(data.data.msg === "success") {
                    this.$message.success('审核完成！');
                    this.getPerformance();
                } else {
                    this.$message.error('审核失败，请重试！');
                }
            })
        },
    },
    watch: {
        $route(to, from) {
            this.userName = this.$route.query.userName; 
        } 
    },
    created() {
        this.getUserInfo(this.$route.query.userName);
        this.getPerformance();
    }
};
</script>
<style lang = "less" scoped>
@import "../../styles/main.less";

#performanceDetails {
    width: 100%;
    height: 100%;
    .performanceDetails-title {
        width: 100%;
        padding: 5px 10px;
        border: 1px solid #ccc;
        h4 {
            width: 100%;
            padding: 5px 10px;
            border-bottom: 1px solid #ccc;
        }
        >div {
            display: inline-block;
            padding: 8px 15px;
            margin: 5px 15px;
            >span {
                display: inline-block;
                padding: 0px 5px; 
            }
        }
    }
    .performanceDetails-contain {
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        margin-top: 3px;
        border: 1px solid #ccc;
        h4 {
            width: 100%;
            padding: 5px 10px;
            border-bottom: 1px solid #ccc;
        }
    }
}
</style>
