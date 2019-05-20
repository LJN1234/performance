<template>
    <div id="performanceList">
        <div class="position">
            <h2>{{titleName}}</h2>
        </div>
        <el-row style="margin-top:20px">
            <el-col :span="24">
                <el-table size="mini" :data="performance.data" border style="width: 100%" highlight-current-row>
                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column v-for="(item,index) in performance.columns" :key="index" :label="item.label" :prop="item.prop" :width="item.width">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isSet">
                                <el-select v-if="item.type === 'select'" @change="getWorkLoad(scope.row,performance.sel[item.prop])" v-model="performance.sel[item.prop]">
                                    <span v-if="item.prop === 'typeName'">
                                        <el-option v-for="item1 in fildTypes" :key="item1._id" :label="item1.projectName" :value="item1.projectName"></el-option>
                                    </span>
                                    <!-- <span v-if="item.prop === 'workload'">
                                        <el-option v-for="(item2,idx) in fildWorkloads" :key="idx" :label="item2" :value="item2"></el-option>
                                    </span> -->
                                </el-select>
                                <el-input v-if="item.type === 'input'" @change="getSubtotal(item.prop,scope.row)" size="mini" placeholder="请输入内容" v-model="performance.sel[item.prop]"></el-input>
                                <span v-if="item.type === 'span'">{{performance.sel[item.prop]}}</span>
                            </span>
                            <span v-else>{{scope.row[item.prop]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <span class="el-tag el-tag--success el-tag--mini" style="cursor: pointer;" @click.stop="saveRow(scope.row,scope.$index)">确定</span>
                            <span class="el-tag el-tag--primary el-tag--mini" style="cursor: pointer;" @click="editRow(scope.row,scope.$index)">编辑</span>
                            <span class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="deleteRow(scope.$index,performance.data)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">
                <div class="el-table-add-row" style="width: 99.2%;" @click="add()"><span>+ 添加</span></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {UUID} from '../../utils/IdUtils';

    export default {
        name: 'PerformanceList',
        data() {
            return {
                performance: {
                    sel: null, //选中行   
                    data: [],  //表格数据
                    columns: [{
                        prop: "typeName",
                        label: "类目",
                        type: 'select',
                        width: 190
                    },
                    {
                        prop: "content",
                        label: "工作内容",
                        type: 'input',
                        width: 220
                    },
                    {
                        prop: "workload",
                        label: "工作量",
                        type: 'span',
                        width: 80
                    },
                    {
                        prop: "coefficient",
                        label: "系数",
                        type: 'input',
                        width: 90
                    },
                    {
                        prop: "subtotal",
                        label: "小计",
                        type: 'span',
                        width: 80
                    },
                    {
                        prop: "directorAudit",
                        label: "教研室主任审核状态",
                        type: 'span',
                        width: 130
                    },
                    {
                        prop: "performanceAudit",
                        label: "绩效小组审核状态",
                        type: 'span',
                        width: 118
                    },
                    {
                        prop: "leaderAudit",
                        label: "领导审核状态",
                        type: 'span',
                        width: 100
                    }],
                },
                titleName: '',   //表格标题
                fildTypes: [],   //绩效类型集合
                fildWorkloads:[],   //工作量集合
                createID: false,   //生成随机ID
            }
        },
        methods: {
            //添加
            add() {
                for (let i of this.performance.data) {
                    if (i.isSet) return this.$message.warning("请先保存当前编辑项");
                }
                let j = {
                    "id": UUID(),
                    "typeName": "",
                    "content": "",
                    "workload": 0,
                    "coefficient": 0,
                    "subtotal": 0,
                    "directorAudit":"未审核",
                    "performanceAudit":"未审核",
                    "leaderAudit":"未审核",
                    "isSet": true,
                };
                this.performance.data.push(j);
                this.performance.sel = j;
            },
            // 获取相应工作量
            getWorkLoad(row,value) {
                let res = this.fildTypes.filter(item => item.projectName === value);
                row.workload = res[0].workload;
            },
            // 计算小计
            getSubtotal(value,row) {
                // console.log(value,row);
                row.subtotal = row.workload*row.coefficient;
            },
            //保存
            saveRow(row, index) { 
                let insertData = {};
                let user = JSON.parse(window.localStorage.getItem('user'));
                insertData.performanceID = this.performance.sel.id;
                insertData.belongsUser = user.userName;
                insertData.belongsDepartment = user.department;
                insertData.typeCode = this. getTypeCode(this.titleName)*1;
                insertData.typeName = this.performance.sel.typeName;
                insertData.content = this.performance.sel.content;
                insertData.workload = this.performance.sel.workload*1;
                insertData.coefficient = this.performance.sel.coefficient*1;
                insertData.subtotal = insertData.workload*insertData.coefficient;
                insertData.directorAudit = "未审核";
                insertData.performanceAudit = "未审核";
                insertData.leaderAudit = "未审核";
                this.$axios.get("/myapi/api/performanceData/findByContent?t="+(new Date()).getTime().toString(),
                    {params:{typeCode:insertData.typeCode,content:row.content}})
                    .then((data)=>{
                        let res = data.data.data;
                        let sum = 0;
                        res.map(item => {
                            sum += item.coefficient
                        })
                        if(sum*1 + row.coefficient*1 > 1){
                            this.$message.error("该项目系数总和已超过1，请确认后再填写")
                        } else {
                            this.$axios.post("/myapi/api/performanceData/insertData?t="+ (new Date()).getTime().toString(),{paramsData:insertData})
                            .then(data => {
                                if (data.data.msg === '添加成功') {
                                    this.$message.success(data.data.msg);
                                    row.isSet = false;
                                    row.subtotal = insertData.subtotal;
                                } 
                                if(data.data.msg === '添加失败'){
                                    this.$message.error(data.data.msg);
                                    this.performance.data.splice(index, 1);
                                }
                                if(data.data.msg === '修改成功'){
                                    this.$message.success(data.data.msg);
                                    row.isSet = false;
                                    row.subtotal = insertData.subtotal;
                                }
                                if(data.data.msg === '修改失败'){
                                    this.$message.error(data.data.msg);
                                }
                            })
                        }
                    })
            },
            //编辑
            editRow(row) {
                for (let i of this.performance.data) {
                    if (i.isSet) return this.$message.warning("请先保存当前编辑行");
                }
                this.performance.sel = row
                row.isSet = true;
            },
            //删除
            deleteRow(index, rows) { 
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post("/myapi/api/performanceData/deleteData?t="+ (new Date()).getTime().toString(),{id: rows[index].performanceID})
                    .then(data => {
                        rows.splice(index, 1);
                        this.$message.success("删除成功！");
                    })
                }).catch(() => {
                    this.$message.success("已取消删除！");          
                });
            },
            getOptions(typeCode) {
                this.fildTypes = [];
                this.fildWorkloads = [];
                this.$axios.get("/myapi/api/performanceDesc/findByType?t="+ (new Date()).getTime().toString(), {params: {typeCode:typeCode},})
                .then(data => {
                    let res = data.data.data;
                    this.fildTypes = res;
                    for (var i in res) {
                        let workload = res[i].workload;
                        this.fildWorkloads.push(workload);
                    }
                })
            },
            getPerformanceData(typeCode) { 
                this.performance.data = [];
                let loginUser = JSON.parse(window.localStorage.getItem('user'));
                this.$axios.get("/myapi/api/performanceData/findByCode?t="+ (new Date()).getTime().toString(), 
                {params: {typeCode:typeCode,user:loginUser.userName}})
                .then(data => {
                    this.performance.data = data.data.data;
                })
            },
        },
        watch: {
            $route(to, from) {
                this.titleName = this.$route.query.titleName;
                this.getOptions(this.$route.query.navId);
                this.getPerformanceData(this.$route.query.navId);
            }
        },
        created() {
            this.titleName = this.$route.query.titleName;
            this.getOptions(this.$route.query.navId);
            this.getPerformanceData(this.$route.query.navId);
        }
    }
</script>

<style lang = "less" scoped>
  
#performanceList {
    width: 100%;
    height: 100%;
    padding: 5px;
    .position {
        width: 100%;
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-size: 14px;
    }
}
.el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
}
</style>