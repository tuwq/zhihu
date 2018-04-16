<template>
  <div id="app">
    <z-header></z-header>
    <br>
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="special">
      <put-question></put-question>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ZHeader from 'components/z-header.vue'; 
import PutQuestion from 'components/putQuestion.vue';
import './lib/jquery/jquery-3.3.1.min.js';
  export default {
    components: {
      ZHeader,
      PutQuestion
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
  @import url('./lib/awesome/css/font-awesome.min.css');
  @import url('./common/style/base.less');
  @import url('./common/style/common.less');
  @import url('./cpLess/app.less');
</style>
