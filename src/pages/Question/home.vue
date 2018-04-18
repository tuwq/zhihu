<template>
 	<div id="questionHome">
 		<q-header></q-header>
 		<br>
 		<div class="main">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import QHeader from 'question_components/q-header.vue';
	export default {
		components: {
			QHeader,
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/home.less');
</style>
