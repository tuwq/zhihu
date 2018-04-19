<template>
  <div class="header-wrapper">
  	<div class="center">	
  		<router-link to="/" class="logo-link">
  			<img class="logo" src="../../../common/image/header/logo.svg" width="85" height="52">
  		</router-link>
	  	<nav class="nav-list">
	  		<a href="#" class="nav-item">首页</a>
	  		<a href="#" class="nav-item">发现</a>
	  		<a href="#" class="nav-item">话题</a>
	  	</nav>
	  	<search-bar></search-bar>
	  	<div class="userinfo">
	  		<span class="avatar" @click.stop="openDrop">
	  			<img src="../../../common/image/header/avatar.png" width='45' height="45">
	  		</span>
	  		<router-link to="/login" class="login">登录</router-link>
	  		<span><i class="icon icon-comments"></i></span>
	  		<span><i class="icon icon-bell"></i></span>
	  	</div>
	 </div>
  </div>
</template>

<script type="text/ecmascript-6">
import searchBar from 'z_components/search-bar.vue';
import {communicationMixin,MethodMixin} from 'common/js/mixin'
	import {mapMutations} from 'vuex';
	export default {
		mixins: [communicationMixin],
		components: {
			'search-bar' : searchBar
		},
		methods: {
			openDrop() {
				this.setIndexDropDown(true);
			},
			...mapMutations({
				setIndexDropDown: 'SET_INDEX_DROPDOWN'
			})
		},
		created() {
			communicationMixin.$on('user_quit',(e) => {
				this.setIndexDropDown(false);
				$('.avatar').hide().siblings('.login').show();
			})
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/z-header.less');
</style>
