<template>
    <div id="home">
        <Header :roleTitle="roleTitle" />
        <div class="home-main">
            <div class="home-aside">
                <ul>
                    <li @click='goPage(item)' :class="nowNav ===item.navId ? 'active' : ''" v-for='(item) in navList' :key='item.navId'>{{item.name}}</li>
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
  name: "Home",
  components: { Header },
  data() {
    return {
      roleTitle: "绩效填写",
      userRose: "",
      nowNav: "1",
      navList: []
    };
  },
  methods: {
    goPage(navList) {
        this.nowNav = navList.navId;
        this.$router.replace({path:'/home/performanceList',query:{navId:navList.navId,titleName:navList.name,}});
    }
  },
  created() {
    this.$axios.get("/myapi/api/performanceDesc/findAll?t="+ (new Date()).getTime().toString())
    .then(data => {
        let res = data.data.data;
        let obj = {};
        res.map((item,idx)=>{
            let obj1 = {};
            obj1.navId = res[idx].typeCode;
            obj1.name = res[idx].typeName
            this.navList.push(obj1)
        })
        for(var i = 0; i < this.navList.length; i++) {
            for(var j = i+1; j < this.navList.length; j++) {
                if(this.navList[i].navId === this.navList[j].navId) {
                    this.navList.splice(j,1);
                    j--;
                }
            }
        }
        this.$router.replace({path:'/home/performanceList',query:{navId:this.navList[0].navId,titleName:this.navList[0].name,}});
    })
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