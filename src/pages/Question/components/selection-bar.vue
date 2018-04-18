<template>
	<div class="selection-wrapper">
		<div class="selection-bar">
	 		<router-link to="/question/qindex/recommend" class="bar-item">为你推荐</router-link>
	 		<router-link to="/question/qindex/hot" class="bar-item">全站热门</router-link>
	 		<router-link to="/question/qindex/invite" class="bar-item">邀请回答</router-link>
	 	</div>
	 	<div class="main-content">
	 		<router-view></router-view>
	 	</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/selection-bar.less');
</style>
