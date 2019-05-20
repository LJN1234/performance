<template>
    <div id="login">
        <h1>教师绩效统计系统</h1>
        <form class="loginForm">
            <div class="loginBox">
                <h3>用户登录</h3>
                <div class="userName">
                    <label>用户名：</label><input type="text" @blur="checkUserName" v-model="userName" placeholder="请输入用户名" autocomplete="off" />
                    <p class="errorMessage">{{ userNameMess }}</p>
                </div>
                <div class="userPass">
                    <label>密码：</label><input type="password" @blur="checkUserPass" v-model="userPass" placeholder="请输入密码" autocomplete="new-password" />
                    <p class="errorMessage">{{ userPassMess }}</p>
                </div>
                <!-- <div  class="loginRole">
                    <el-radio v-model="radioRole" label="教师">教师</el-radio>
                    <el-radio v-model="radioRole" label="管理员">管理员</el-radio>
                </div> -->
                <div class="loginButton">
                    <input type="button" @click='toLogin' value="登录" />
                    <input type="reset" value="重置" />
                </div>
                <div class="changePassword">
                    <span class="change" @click="goToretrieve">修改密码</span>
                </div>
            </div>
        </form>
        
    </div>
</template>
<script>
    export default {
        name:'login',
        data() {
            return {
                radioRole: '教师',
                userName:'',
                userPass:'',
                userNameMess:'',
                userPassMess:'',
                checkNameSwitch:false,
                checkPassSwitch:false,
            };
        },
        methods: {
            // 验证用户名
            checkUserName() {
                if (!this.userName) {
                    this.userNameMess = "用户名不能为空";
                    setTimeout(()=>{this.userNameMess = ""},1500);
                } else {
                    var reg = new RegExp(/^[0-9]*$/);
                    if (!reg.test(this.userName)) {
                        this.userNameMess = "用户名输入不正确";
                        setTimeout(()=>{this.userNameMess = ""},1500);
                    } else {
                        this.checkNameSwitch = true;
                    }
                }
            },
            // 验证密码
            checkUserPass() {
                if (!this.userPass) {
                    this.userPassMess = "密码不能为空";
                    setTimeout(()=>{this.userPassMess = ""},1500);
                } else {
                    var reg = new RegExp(/^[a-zA-Z]\w{5,17}$/ | /^[0-9]*$/);
                    if (!reg.test(this.userPass)) {
                        this.userPassMess = "密码正确格式为：以字母开头，长度在6-18之间，只能包含字符、数字和下划线";
                        setTimeout(()=>{this.userPassMess = ""},1500);
                    } else {
                        this.checkPassSwitch = true;
                    }
                }
                
            },
            // 点击登录按钮
            toLogin() {
                if (this.checkNameSwitch && this.checkPassSwitch ) {
                    // 如果没有修改初始密码
                    // if (this.userPass !== this.userName) {
                        this.$axios.post("/myapi/api/userInfo/login", {userID:this.userName,userPass:this.userPass})
                        .then(data => {
                            //连接失败
                            if (data.status != 200) {
                                this.$message({
                                    showClose: true,
                                    message: '用户名或密码错误，请重新输入',
                                    type: 'error'
                                });

                            // 连接成功
                            } else {
                                // 登录失败
                                if(data.data.status == -1) {
                                    this.$message({
                                        showClose: true,
                                        message: '用户名或密码错误，请重新输入',
                                        type: 'error'
                                    });
                                // 登录成功
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: '登录成功，正在跳转首页',
                                        type: 'success',
                                        duration:1000,
                                        onClose:()=>{
                                            // 登录成功后跳转到指定页面
                                            // if (this.radioRole === '教师') {
                                                // this.$axios.get("/myapi/api/userInfo/findById", {params:{id:this.userName}})
                                                // .then(data => {
                                                    let user = {};
                                                    user.loginStatus = true;
                                                    user.userID = data.data.data[0].userID;
                                                    user.userName = data.data.data[0].userName;
                                                    user.department = data.data.data[0].department;
                                                    window.localStorage.setItem('user',JSON.stringify(user));
                                                    this.$router.push({path:'/home'})
                                                // })
                                            // } else {
                                            //     this.$router.push({path:'/retrievePass',query:{userName:this.userName} })
                                            // }
                                        }
                                    });
                                }
                            }
                        });
                    // } else {
                    //     this.$message.warning("您的密码是初始密码，为保护您的信息，请先修改密码");
                    // }
                } else {
                    this.$message.error("请填写用户名和密码")
                }
            },
            // 点击修改密码
            goToretrieve() {
                // console.log()
                this.$router.push({path:'/retrievePass',query:{userName:this.userName} })
            }
        }
    }
</script>
<style lang = "less" scoped>
@import '../../styles/main.less';

    #login {
        width: 100%;
        height: 100%;
        min-height: 550px;
        position: relative;
        /* background: url('../../assets/bgLogin.png') no-repeat; */
        background: url('../../assets/login.png') no-repeat; 
        background-size:  100% 100%;
        h1 {
            width: 100%;
            height: 70px;
            color: #fff;
            padding-top: 30px;
            text-align: center;
        }
        .loginForm {
            width: 100%;
            .loginBox {
                width: 420px;
                height: 324px;
                color: white;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                background:rgba(213, 213, 214, 0.5);
                /* background: #f5f5f5; */
                h3 {
                    width: 100%;
                    height: 80px;
                    line-height: 80px;
                    text-align: center;
                }
                .userName, .userPass {
                    width: 100%;
                    height: 50px;
                    margin: 0 85px 0 85px;
                    label {
                        display: inline-block;
                        width: 70px;
                        height: 40px;
                        text-align: right;
                        line-height: 40px;
                    }
                    input {
                        display: inline-block;
                        width: 180px;
                        height: 28px;
                        text-align: left;
                        line-height: 28px;
                        margin: 5px;
                        border:1px solid #ccc;
                        font-size: 12px;
                        background: #f5f5f5;
                    }
                    .errorMessage {
                        width: 256px;
                        /* height: 20px; */
                        margin: 0 0 0 75px;
                        font-size: 12px;
                        color: red;
                        /* background: red; */
                    }
                }
                .loginRole {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    /* background: red; */
                }
                .loginButton{
                    width: 100%;
                    height: 40px;
                    text-align: center;
                    margin-top: 10px;
                    input {
                        display: inline-block;
                        width: 80px;
                        height:30px;
                        text-align: center;
                        line-height:30px;
                        margin: 5px;
                        background: rgb(9, 116, 240);
                        color:#fff;
                        cursor: pointer;
                    }
                }
            }
        }
        .changePassword {
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding: 0 85px;
            .change {
                float: right;
                color: blue;
                font-size: 14px;
                padding: 2px 10px;
                &:hover{
                    color: red;
                    cursor: pointer;
                }
            } 
        }
    }
</style>
