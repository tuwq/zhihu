<template>
  <div class="header-wrapper">
  	<div class="center">	
  		<router-link to="/" class="logo-link">
  			<img class="logo" src="../common/image/header/logo.svg" width="85" height="52">
  		</router-link>
	  	<nav class="nav-list">
	  		<a href="#" class="nav-item">首页</a>
	  		<a href="#" class="nav-item">发现</a>
	  		<a href="#" class="nav-item">话题</a>
	  	</nav>
	  	<search-box></search-box>
	  	<div class="userinfo">
	  		<span class="avatar">
	  			<img src="../common/image/header/avatar.png" width='45' height="45">
	  		</span>
	  		<span><i class="icon icon-comments"></i></span>
	  		<span><i class="icon icon-bell"></i></span>
	  	</div>
	 </div>
  </div>
</template>

<script type="text/ecmascript-6">
import searchBox from 'components/search-bar.vue';
	export default {
		components: {
			'search-box' : searchBox
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/z-header.less');
</style>
