    <template>
        <div id="header">
            <div class="header-title">
                <h3>
                    <span class="itemTitle">教师绩效统计系统</span>|
                    <span class="roleTitle">{{roleTitle}}</span>
                </h3>
            </div>
            <div class="header-userInfo">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <span>欢迎您，{{loginUser}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for='(item,idx) in auditPagesList' :key='idx' :command='item'>{{item.title}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </template>
    <script>
    export default {
        name: "Heaer",
        props: ["roleTitle"],
        data() {
            return {
                auditPagesList: [
                    { title: "我的信息", path: "/user" },
                    { title: "绩效填写", path: "/home" },
                    { title: "退出登录", path: "/login" },
                ],
                loginUser: '',
            };
        },
        methods: {
            handleCommand(info) {
                if (info.title === "退出登录") {
                    this.$router.push({ path: info.path });
                    window.localStorage.setItem('user','');
                    this.loginUser = '';
                } else {
                    this.$router.push({path: info.path, query: {roleTitle: info.title}});
                }
            }
        },
        created () {
            this.loginUser = JSON.parse(window.localStorage.getItem('user')).userName;
            this.$axios.get("/myapi/api/position/findByUserID?t="+ (new Date()).getTime().toString(),{params:{userName:this.loginUser}})
            .then(data => {
                if (data.data.data[0].leadership !== '否') {
                    this.auditPagesList.splice(2,0,{ title: "领导审核", path: "/audit" },)
                }
                if (data.data.data[0].performanceTeam !== '否') {
                    this.auditPagesList.splice(2,0,{ title: "绩效小组审核", path: "/audit" },)
                }
                if (data.data.data[0].chairman !== '否') {
                    this.auditPagesList.splice(2,0,{ title: "教研室主任审核", path: "/audit" },)
                }
            })
        }
    };
    </script>
    <style lang = "less" scoped>
    @import "../styles/main.less";

    #header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    z-index: 999;
    color: #fff;
    padding: 0 20px;
    clear: both;
    background: #2d6dcc;
    .header-title {
        height: 50px;
        line-height: 50px;
        float: left;
        h3 {
        height: 50px;
        line-height: 50px;
        .itemTitle, .roleTitle {
            padding: 0 10px;
        }
        .roleTitle {
            font-size: 16px;
            color: rgb(240, 235, 235);
        }
        }
    }
    .header-userInfo {
        height: 40px;
        line-height: 40px;
        float: right;
        span {
        margin-right: 5px;
        }
    }
    }

    /* 引用element组件样式 */
    .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    }
    .el-icon-arrow-down {
    font-size: 12px;
    }
    </style>