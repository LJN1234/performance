<template>
    <div id="reviewList">
        <div v-if="userList.length > 0">
            <el-tag class="eachTag" @click="toDetails(item)" v-for="(item) in userList" :key="item.userID">
                {{item.belongsUser}}
            </el-tag>
        </div>
        <div v-else>
            已审核完毕！
        </div>
    </div>
</template>
<script>

export default {
    name: "ReviewList",
    components: {},
    data() {
        return {
            loginUser: '',
            auditStatus: '',
            userList:[],
            auditStatus: this.$route.query.auditStatus,
        };
    },
    methods: {
        toDetails(userInfo) {
            this.$router.push({path:'/audit/performanceDetails',
                query:{
                    roleTitle: this.$route.query.roleTitle,
                    auditStatus: this.$route.query.auditStatus,
                    userName: userInfo.belongsUser,
                },
                params:userInfo,    
            });
        },
        getUserList() {
            let auditStatus  = this.$route.query.auditStatus;
            this.loginUser = JSON.parse(window.localStorage.getItem('user'));
            if(this.$route.query.roleTitle === '教研室主任审核') {
                this.$axios.get("/myapi/api/performanceData/findByStatus?t="+ (new Date()).getTime().toString(),
                {params:{role:this.$route.query.roleTitle,department:this.loginUser.department,auditStatus:auditStatus}})
                .then(data => {
                    this.userList = [];
                    var dat = data.data.data;
                    var obj = {};
                    for(var i =0; i<dat.length; i++){
                        if(!obj[dat[i].key]){
                            this.userList.push(dat[i]);
                            obj[dat[i].key] = true;
                        }
                    }
                })
            }
            if(this.$route.query.roleTitle === '绩效小组审核') {
                this.$axios.get("/myapi/api/performanceData/findByStatus?t="+ (new Date()).getTime().toString(),
                {params:{role:this.$route.query.roleTitle,auditStatus:auditStatus}})
                .then(data => {
                    this.userList = [];
                    var dat = data.data.data;
                    var obj = {};
                    for(var i =0; i<dat.length; i++){
                        if(!obj[dat[i].key]){
                            this.userList.push(dat[i]);
                            obj[dat[i].key] = true;
                        }
                    }
                })
            }
            if(this.$route.query.roleTitle === '领导审核') {
                this.$axios.get("/myapi/api/performanceData/findByStatus?t="+ (new Date()).getTime().toString(),
                {params:{role:this.$route.query.roleTitle,auditStatus:auditStatus}})
                .then(data => {
                    this.userList = [];
                    var dat = data.data.data;
                    var obj = {};
                    for(var i =0; i<dat.length; i++){
                        if(!obj[dat[i].key]){
                            this.userList.push(dat[i]);
                            obj[dat[i].key] = true;
                        }
                    }
                })
            }
        }
    },
    watch: {
            $route(to, from) {
                this.getUserList();
            }
        },
    created() {
        this.getUserList();
    }
};
</script>
<style lang="less" scoped>
@import "../../styles/main.less";

#reviewList {
    width: 100%;
    height: 100%;
    .eachTag {
        margin: 10px 20px;
        cursor: pointer;
    }
}
</style>