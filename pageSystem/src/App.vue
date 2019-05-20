<template>
  <div id="app">
    <!-- <Header /> -->
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'; //引入组件 

export default {
  name: 'App',
  components: {
    Header   //注册组件
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background: f5f5f5;
    overflow: auto;
  /* margin-top: 60px; */
}
</style>
