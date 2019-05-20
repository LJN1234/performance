<template>
    <div id="retrievePass">
        <div class="stepsBox">
            <el-steps :active="activeSteps" align-center finish-status="success">
                <el-step title="验证用户信息">验证用户信息</el-step>
                <el-step title="修改用户密码">修改用户密码</el-step>
                <el-step title="修改密码成功">完成</el-step>
            </el-steps>
            <div class="verifyBox">
                <div class="verifyContent" v-if="activeSteps === 0">
                    <h3>验证用户信息</h3>
                    <div class="verifyInfo" >
                        <p><label for="用户编号">编号：</label><input type="text" ref="userID" value=""></p>
                        <p><label for="用户编号">姓名：</label><input type="text" ref="userName" value=""></p>
                        <p><label for="用户编号">旧密码：</label><input type="text" ref="userPass" value=""></p>
                    </div>
                </div>
            <div class="verifyContent" v-if="activeSteps === 1">
                <h3>修改用户密码</h3>
                <div class="verifyInfo">
                    <p><label for="用户编号">新密码：</label><input type="text" ref="newPass" value=""></p>
                    <p><label for="用户编号">确认密码：</label><input type="text" ref="reNewPass" value=""></p>
                </div>
            </div>
            <div class="verifyContent" v-if="activeSteps === 2">
                <h3>完成</h3>
                <div class="verifyInfo">
                    <p class="updateResult">
                        <i v-if="result === '修改成功'" class="el-icon-success"></i>
                        <i v-else class="el-icon-error"></i>
                        <span>{{result}}</span>
                    </p>
                    <p class="updateTip">点击完成按钮可跳转到登录页面进行登录</p>
                </div>
            </div>
            <div class="verifyContent" v-if="activeSteps === 3">
                <h3>完成</h3>
                <div class="verifyInfo">
                    <p>正在进行跳转，请稍后...</p>
                </div>
            </div>
            <div class="verifyBtn">
                <el-button class="btn" @click="prev" v-if="activeSteps === 1">上一步</el-button>
                <el-button class="btn" @click="next" v-if="activeSteps === 0">下一步</el-button>
                <el-button class="btn" @click="sub" v-if="activeSteps === 1">提交</el-button>
                <el-button class="btn" @click="finish" v-if="activeSteps === 2 && result === '修改成功'">完成</el-button>
                <el-button class="btn" @click="nofinish" v-if="activeSteps === 2 && result !== '修改成功'">返回</el-button>
            </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'RetrievePass',
    data() {
        return {
            activeSteps: 0,
            result:'修改失败',
            userData:{}
        }
        
    },
    methods: {
        prev() {
            if (this.activeSteps-- < 0) this.activeSteps = 0;
        },
        next() {
            if (this.$refs.userID.value && this.$refs.userName.value && this.$refs.userPass.value) {
                this.$axios.post("/myapi/api/userInfo/login", {userID:this.$refs.userID.value,userPass:this.$refs.userPass.value})
                .then(data => {
                    if(data.data.msg === 'success') {
                        this.userData = data.data.data[0];
                        // window.sessionStorage.setItem('userID',this.$refs.userID.value)
                        if (this.activeSteps++ > 1) this.activeSteps = 0;
                    } else {
                       this.$message.error("编号或密码错误，请重新输入！"); 
                    }
                })
            } else {
                this.$message.error("请先输入信息！");
                
            }
            
        },
        sub() {
            if (this.$refs.newPass.value 
                &&  this.$refs.reNewPass.value 
                && this.$refs.newPass.value === this.$refs.reNewPass.value
            ) {
                this.userData.userPass = this.$refs.newPass.value;
                this.$axios.post("/myapi/api/userInfo/updateTeacher?t="+ (new Date()).getTime().toString(),
                    this.userData
                )
                .then(data => {
                    if(data.data.msg === 'success') {
                        this.result = '修改成功';
                        this.activeSteps = 2;
                    }
                })
            } else {
                this.$message.error("请先输入信息！");
                
            }
        },
        finish() {
            this.activeSteps = 3;
            if (this.$route.path === '/retrievePass') {
                setTimeout(()=>{
                    this.$router.push('/login')
                },1000)
            } else {
                console.log(this.$route.path)
                this.$router.push('/user/personalInfo')
            }
        },
        nofinish() {
            this.activeSteps = 0;
        }
    },
    created () {
        console.log(this.$route.path)
    }
}
</script>
<style lang = "less" scoped>
@import '../../styles/main.less';

#retrievePass {
    width: 100%;
    height: 100%;
    min-height: 500px;
    padding: 20px 100px;
    background: url('../../assets/login.png') no-repeat;
    background-size:  100% 100%;
    .stepsBox {
        width: 100%;
        height: 100%;
        position: relative;
        .verifyBox {
            width: 460px;
            height: 240px;
            position: absolute;
            top: 107px;
            left: 50%;
            transform: translate(-50%,0);
            background: rgb(151, 203, 233);
            .verifyContent {
                width: 460px;
                height: 200px;
                position: absolute;
                top: 0;
                left: 0;
                h3 {
                    width: 100%;
                    height: 35px;
                    line-height: 35px;
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                    background: rgb(77, 179, 238);
                }
                .verifyInfo {
                    width: 100%;
                    height: 165px;
                    font-size: 14px;
                    padding: 5px 0px;
                    p {
                        width: 100%;
                        vertical-align:middle;
                        padding:10px 60px;
                        label {
                            display: inline-block;
                            width: 80px;
                            height: 34px;
                            line-height: 34px;
                            text-align: right;
                            vertical-align: middle;
                            color: #fff;
                        }
                        input {
                            width: 200px;
                            height: 34px;
                            line-height: 34px;
                            border-radius: 5px;
                            border: 1px solid rgb(216, 216, 216);
                            vertical-align: middle;
                            color:#666;
                        }
                    }
                    .updateResult {
                        height: 56px;
                        line-height: 56px;
                        color: green;
                        font-size: 20px;
                        padding: 0px 80px;
                        display: flex;
                        i {
                            font-size: 56px;
                            margin-right: 10px;
                        }
                    }
                    .updateTip {
                        padding-left: 130px;
                    }
                }
            } 
            .verifyBtn {
                height: 40px;
                text-align: center;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                .btn {
                    color: #fff;
                    background: rgb(77, 179, 238);
                }
            }
        }
    }
}
</style>