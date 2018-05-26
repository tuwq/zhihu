<template>
  <div id="mainHome">
      <main-header></main-header>   
    <br>
    <div class="main">
        <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mainHeader from 'base/mainHeader.vue';
  export default {  
      components: {
        mainHeader
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  #mainHome {
    .main {
      position: relative;
      display: block;
      margin-top: 48px; // 分开顶部栏
    }
  }
</style>
