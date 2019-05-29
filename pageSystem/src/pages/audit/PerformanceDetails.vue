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
                <el-table-column label="审核状态" width="180">
                    <template slot-scope="scope">
                        <span v-if="roleTitle === '教研室主任审核'" style="margin-left: 10px">{{ scope.row.directorAudit }}</span>
                        <span v-if="roleTitle === '绩效小组审核'" style="margin-left: 10px">{{ scope.row.performanceAudit }}</span>
                        <span v-if="roleTitle === '领导审核'" style="margin-left: 10px">{{ scope.row.leaderAudit }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleResult(scope,'已通过审核')">同意</el-button>
                            <el-popover trigger="click"  :ref="`popover-${scope.$index}`"  placement="bottom" width="270" >
                                <p>请写下您不同意的理由：</p>
                                <el-input type="textarea" placeholder="请输入内容" autosize v-model="inputContent"></el-input>
                                <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="no(scope)">取消</el-button>
                                        <el-button type="primary" size="mini" @click="handleResult(scope,'未通过审核')">确定</el-button>
                                </div>
                                <el-button  slot="reference" size="mini" type="danger">不同意</el-button>
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
            roleTitle: '',
            visible: false,
            userName: '',
            userInfo: [],
            summation:0,
            tableData: [],
            inputContent: '',

        };
    },
    methods: {
        no(scope){
            this.$message('取消操作');
            scope._self.$refs[`popover-${scope.$index}`].doClose()
        },
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
        handleResult(scope,result) {
            if(result === '未通过审核') {
                result = this.inputContent;
            }
            if(result) {
                this.$axios.post("/myapi/api/performanceData/chageAuditStatus?t="+ (new Date()).getTime().toString(),
                {role:this.$route.query.roleTitle,performanceID:scope.row.performanceID,result:result})
                .then(data => {
                    if(data.data.msg === "success") {
                        this.$message.success('审核完成！');
                        this.visible = false;
                        this.$message({message:"审核完成",type: 'success'});
                        scope._self.$refs[`popover-${scope.$index}`].doClose()
                        this.getPerformance();
                    } else {
                        this.visible = false;
                        this.$message.error('审核失败，请重试！');
                    }
                })
            } else {
                this.$message.error('请先填写不同意的理由！');
            }
        },
    },
    watch: {
        $route(to, from) {
            this.userName = this.$route.query.userName; 
            this.roleTitle = this.$route.query.roleTitle;
        } 
    },
    created() {
        this.roleTitle = this.$route.query.roleTitle;
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
