<template>
 	<div class="q-header">
 		<div class="header-wrapper">
 			<div class="center">
 				<div class="header-left">
					<router-link class="logo" to="/">
	 					<img src="../../../common/image/header/logo2.png" height="45">
	 				</router-link>
	 				<search-bar></search-bar>
	 				<div class="nav-list">
	 					<ul class="nav-items">
	 						<li class="nav-item"><a>首页</a></li>
	 						<li class="nav-item"><a>发现</a></li>
	 						<li class="nav-item"><a>消息</a></li>
	 					</ul>
	 				</div>
	 				<div class="putBtn-wrapper">
	 					<button class="putBtn">提问</button>
	 				</div>
 				</div>
 				<div class="userInfo">
 					<div class="top">
 						<span class="avatar"><img src="../../../common/image/header/avatar.png" width="27	" height="27"><i class="num">2</i></span>
 						<span class="name">炮塔向后转</span>
 					</div>
 					<drop-down class="dropdown"></drop-down>
 				</div>
 			</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import searchBar from 'question_components/search-bar.vue';
	import dropDown from 'base/drop-down.vue';
	export default {
		components: {
			'search-bar': searchBar,
			'drop-down': dropDown
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/q-header.less');
</style>
