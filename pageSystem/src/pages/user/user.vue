<template>
    <div id="home">
        <Header :roleTitle="roleTitle" />
        <div class="home-main">
            <div class="home-aside">
                <ul>
                    <li @click='goPage(item)' :class="nowNav ===item.navId ? 'active' : ''" v-for='(item) in navList' :key='item.id'>{{item.title}}</li>
                </ul>
            </div>
            <div class="home-content">
                <!-- <div>欢迎使用数统学院教师绩效统计系统</div> -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "../../components/Header"; //引入组件

export default {
  name: "User",
  components: { Header },
  data() {
    return {
      roleTitle: "我的信息",
      userRose: "",
      nowNav: 1,
      navList: [
        { navId: 1, title: "基本信息", path:'/user/personalInfo' },
        { navId: 2, title: "修改密码", path:'/user/retrievePass'},
      ]
    };
  },
  methods: {
    goPage(navList) {
        this.nowNav = navList.navId;
        this.$router.replace({path:navList.path,query:{navId:navList.navId,titleName:navList.name,}});
    }
  },
  created() {
    // this.$router.replace({path:'/user/personalInfo',query:{navId:this.navList[0].navId,titleName:this.navList[0].name,}});
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/main.less";

#home {
  width: 100%;
  height: 100%;
  position: relative;
  .home-main {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    .home-aside {
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
    .home-content {
      flex: 1;
      height: 100%;
      margin-left: 3px;
      // border: 1px solid red;
    }
  }
}
</style>