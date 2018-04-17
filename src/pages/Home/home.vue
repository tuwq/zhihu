<template>
  <div id="home">
    <z-header></z-header>
    <br>
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="special">
      <put-question></put-question>
      <writeIdea></writeIdea>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ZHeader from 'z_components/z-header.vue'; 
import PutQuestion from 'z_components/putQuestion.vue';
import writeIdea from 'z_components/writeIdea.vue';
  export default {
    components: {
      ZHeader,
      PutQuestion,
      writeIdea,
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/home.less');
</style>
