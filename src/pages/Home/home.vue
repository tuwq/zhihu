<template>
  <div id="home" @click.stop.prevent="clsModal">
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
      <z-drop></z-drop>
      <remind-list :reminds="['suggest','toTop']"></remind-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ZHeader from 'z_components/z-header.vue'; 
import PutQuestion from 'z_components/putQuestion.vue';
import writeIdea from 'z_components/writeIdea.vue';
import zDrop from 'z_components/zDrop.vue';
import {mapMutations} from 'vuex'; 
import remindList from 'base/remind-list.vue';
import axios from 'axios'
  export default {
    methods: {
        clsModal() {
          this.setIndexDropDown(false)
        },
        ...mapMutations({
          setIndexDropDown: 'SET_INDEX_DROPDOWN',
        })
      },
      components: {
        ZHeader,
        PutQuestion,
        writeIdea,
        zDrop,
        remindList
      },
     watch: {
      '$route' (to, from) {
        const toDepth = to.path
        const fromDepth = from.path
        if(toDepth == '/home') {
           this.$router.go(0)
        }
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/home.less');
</style>
