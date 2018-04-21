<template>
  <div class="header-wrapper">
  	<div class="center">	
  		<router-link to="/" class="logo-link">
  			<img class="logo" src="../../../common/image/header/logo.svg" width="85" height="52">
  		</router-link>
	  	<nav class="nav-list">
	  		<a href="#" class="nav-item">首页</a>
	  		<a class="nav-item">发现</a>
	  		<a href="#" class="nav-item">话题</a>
	  	</nav>
	  	<search-bar></search-bar>
	  	<div class="userinfo">
	  		<span class="avatar" @click.stop="openDrop" v-show="exist_user==1">
	  			<img src="../../../common/image/header/avatar.png" width='45' height="45">
	  		</span>
	  		<router-link to="/login" class="login" v-show="exist_user==0" target="_blank">登录</router-link>
	  		<span><i class="icon icon-comments"></i></span>
	  		<span><i class="icon icon-bell"></i></span>
	  	</div>
	 </div>
  </div>
</template>

<script type="text/ecmascript-6">
import searchBar from 'z_components/search-bar.vue';
	import {mapMutations,mapGetters} from 'vuex';
	export default {
		components: {
			'search-bar' : searchBar
		},
		computed: {
			...mapGetters([
				'exist_user'
			])
		},
		methods: {
			openDrop() {
				this.setIndexDropDown(true);
			},
			...mapMutations({
				setIndexDropDown: 'SET_INDEX_DROPDOWN',
			})
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/z-header.less');
</style>
