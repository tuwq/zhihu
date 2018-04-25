<template>
 	<div class="q-header">
 		<div class="center">
 			<router-link to="/" class="logo-link"><img src="../../../common/image/header/logo2.png" height="40"></router-link>
 			<search-bar></search-bar>
 			<nav class="nav-list">
 				<a class="nav-item">首页</a>
 				<a class="nav-item">发现</a>
 				<a class="nav-item">消息</a>
 			</nav>		
 			<div class="userinfo">
 				<button class="submit">提问</button>
 				<div style="position: relative;">
 					<a class="avatar-link"><img src="../../../common/image/index/avatar_user_header.jpg" alt="">
	 					<span class="tag">8</span></a>
	 				<a class="username" @click.stop.prevent="switchDropDown">炮塔向后转</a>
	 				<drop-down v-show="dropDownStatus"></drop-down>
 				</div>
 			</div>	
 		</div>

 	</div>
</template>

<script type="text/ecmascript-6">
	import searchBar from 'question_components/search-bar.vue';
	import dropDown from 'base/drop-down.vue';
	export default {
		data() {
			return {
				dropDownStatus: false
			}
		},
		components: {
			'search-bar': searchBar,
			'drop-down': dropDown
		},
		methods: {
			switchDropDown() {
				this.dropDownStatus = !this.dropDownStatus;
			},
			clsMask() {
				this.dropDownStatus = false;
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/q-header.less');
</style>
