<template>
    <div id="personalInfo">
        <div class="infoContent">
            <table class="table">
                <tbody>
                    <tr>
                        <th class="text-r">编号：</th>
                        <td class="text-l">{{userInfo.userID}}</td>
                    </tr>
                    <tr>
                        <th class="text-r">姓名：</th>
                        <td class="text-l"><input type="text" ref="userName" @focus="update()" :value="userInfo.userName"></td>
                    </tr>
                    <tr>
                        <th class="text-r">所属教研室：</th>
                        <td class="text-l"><input type="text" ref="department" @focus="update()" :value="userInfo.department"></td>
                    </tr>
                    <tr>
                        <th class="text-r">性别：</th>
                        <td class="text-l"><input type="text" ref="gender" @focus="update()" :value="userInfo.gender"></td>
                    </tr>
                    <tr>
                        <th class="text-r">出生年月：</th>
                        <td class="text-l"><input type="text" ref="birthday" @focus="update()" :value="userInfo.birthday"></td>
                    </tr>
                    <tr>
                        <th class="text-r">入校时间：</th>
                        <td class="text-l"><input type="text" ref="enteTime" @focus="update()" :value="userInfo.enteTime"></td>
                    </tr>
                    <tr>
                        <th class="text-r">任职状态：</th>
                        <td class="text-l"><input type="text" ref="asState" @focus="update()" :value="userInfo.asState"></td>
                    </tr>
                    <tr>
                        <th class="text-r">单位号：</th>
                        <td class="text-l"><input type="text" ref="unitNumber" @focus="update()" :value="userInfo.unitNumber"></td>
                    </tr>
                    <tr>
                        <th class="text-r">单位名称：</th>
                        <td class="text-l"><input type="text" ref="unitName" @focus="update()" :value="userInfo.unitName"></td>
                    </tr>
                    <tr>
                        <th class="text-r">学历：</th>
                        <td class="text-l"><input type="text" ref="education" @focus="update()" :value="userInfo.education"></td>
                    </tr>
                    <tr>
                        <th class="text-r">最高学位：</th>
                        <td class="text-l"><input type="text" ref="highestDegree" @focus="update()" :value="userInfo.highestDegree"></td>
                    </tr>
                    <tr>
                        <th class="text-r">学缘：</th>
                        <td class="text-l"><input type="text" ref="learnEdge" @focus="update()" :value="userInfo.learnEdge"></td>
                    </tr>
                    <tr>
                        <th class="text-r">专业技术职称：</th>
                        <td class="text-l"><input type="text" ref="technicalTitles" @focus="update()" :value="userInfo.technicalTitles"></td>
                    </tr>
                    <tr>
                        <th class="text-r">学科类别：</th>
                        <td class="text-l"><input type="text" ref="subjectCategory" @focus="update()" :value="userInfo.subjectCategory"></td>
                    </tr>
                    <tr>
                        <th class="text-r">政治面貌：</th>
                        <td class="text-l"><input type="text" ref="politicsStatus" @focus="update()" :value="userInfo.politicsStatus"></td>
                    </tr>
                    <tr>
                        <th class="text-r">民族：</th>
                        <td class="text-l"><input type="text" ref="national" @focus="update()" :value="userInfo.national"></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn" v-if="showUpdate === true"><el-button type="primary" plain @click="saveUpdate()">确定</el-button></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PersonalInfo",
    components: {  },
    data() {
        return {
            roleTitle: "我的信息",
            userInfo:{},
            showUpdate:false,
        };
    },
    methods: {
        getUserInfo() {
            let userID = JSON.parse(window.localStorage.getItem('user')).userID
            this.$axios.post("/myapi/api/userInfo/findById?t="+ (new Date()).getTime().toString(),{id:userID})
            .then(data => {
                this.userInfo = data.data.data[0];
                this.showUpdate=false;
            })
        },
        update(value) {
            this.showUpdate=true;
        },
        saveUpdate() {
            let info = {};
            info.userID=this.userInfo.userID;
            info.userName = this.$refs.userName.value;
            info.userPass = this.userInfo.userPass;
            info.department = this.$refs.department.value;
            info.gender = this.$refs.gender.value;
            info.birthday = this.$refs.birthday.value;
            info.enteTime = this.$refs.enteTime.value;
            info.asState = this.$refs.asState.value;
            info.unitNumber = this.$refs.unitNumber.value;
            info.unitName = this.$refs.unitName.value;
            info.education = this.$refs.education.value;
            info.highestDegree = this.$refs.highestDegree.value;
            info.learnEdge = this.$refs.learnEdge.value;
            info.technicalTitles = this.$refs.technicalTitles.value;
            info.subjectCategory = this.$refs.subjectCategory.value;
            info.politicsStatus = this.$refs.politicsStatus.value;
            info.national = this.$refs.national.value;
            this.$axios.post("/myapi/api/userInfo/updateTeacher?t="+ (new Date()).getTime().toString(),info)
            .then(data => {
                if(data.data.msg === 'success') {
                    this.$message.success("恭喜你，修改成功！");
                    this.getUserInfo();
                } else {
                    this.$message.success("修改失败，请重试！")
                }
            })
        }
    },
    created() {
        this.getUserInfo();
    }
};
</script>
<style lang = "less" scoped>

#personalInfo {
    width: 100%;
    height: 100%;
    position: relative;
    .infoContent {
        width: 800px;
        position: absolute;
        left: 50%;
        top: 5%;
        transform: translate(-50%,0%);
        .table {
            tr {
                margin: 2px 2px;
                display: inline-block;
                border: 1px solid #8adcff;
                .text-r {
                    width: 130px;
                    height: 40px;
                    line-height: 40px;
                    text-align: right;
                    background: #8adcff;
                }
                .text-l {
                    width: 230px;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 10px;
                    input {
                        width: 230px;
                        height: 40px;
                        line-height: 40px;
                    }
                }
            }
        }
        .btn {
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
        }
    }
}
</style>