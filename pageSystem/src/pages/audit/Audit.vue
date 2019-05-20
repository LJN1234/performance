<template>
    <div id="audit">
        <Header :roleTitle='roleTitle' />
        <div class="audit-main">
            <div class="audit-aside">
                <ul>
                    <li @click='goPage(item)' :class="nowNav ===item.stateId ? 'active' : ''" v-for='(item) in stateList' :key='item.id'>{{item.auditStatus}}</li>
                </ul>
            </div>
            <div class="audit-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "../../components/Header"; //引入组件
import PerformanceDetails from './PerformanceDetails';

export default {
    name: "Audit",
    components: { Header, PerformanceDetails },
    data() {
        return {
            userName: "",
            roleTitle: "",
            nowNav: '0',
            stateList: [
                {stateId: '0', auditStatus: '未审核'},
                {stateId: '1', auditStatus: '已通过审核'},
                {stateId: '2', auditStatus: '未通过审核'},
                
            ]
        };
    },
    // 监听,当路由发生变化的时候执行
    watch: {
        $route(to, from) {
            this.roleTitle = this.$route.query.roleTitle;
        }
    },
    methods:{
        goPage(info) {
            this.nowNav = info.stateId;
            this.$router.push({path:'/audit/reviewList',query:{roleTitle:this.roleTitle,auditStatus:info.auditStatus}})
        }
    },
    created() {
        this.roleTitle = this.$route.query.roleTitle;
        this.$router.push({path:'/audit/reviewList',query:{roleTitle:this.roleTitle,auditStatus:this.stateList[0].auditStatus}})
    }
};
</script>
<style lang="less" scoped>
@import "../../styles/main.less";

#audit {
    width: 100%;
    height: 100%;
    .audit-main {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        .audit-aside {
            width: 160px;
            height: 100%;
            background: #c8cbd1;
            ul {
                width: 160px;
                font-size: 14px;
                li {
                    width: 160px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    cursor: pointer;
                    border-bottom: 1px solid #fff;
                }
                .active {
                    background: #032e85;
                    color: #fff;
                }
            }
        }
        .audit-content {
            flex: 1;
            height: 100%;
            margin-left: 3px;
            // border: 1px solid red;
        }
    }
}
</style>