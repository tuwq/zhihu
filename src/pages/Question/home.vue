<template>
 	<div id="questionHome">
 		<q-header></q-header>
 		<br>
 		<div class="main">
 			<div class="home-left">
	 			<selection-bar></selection-bar>
	 		</div>
	 		<div class="home-right">
	 			<msgs></msgs>
	 		</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import QHeader from 'question_components/q-header.vue';
	import SelectionBar from 'question_components/selection-bar.vue';
	import msgs from 'question_components/msgs.vue';
	export default {
		components: {
			QHeader,
			SelectionBar,
			msgs
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/home.less');
</style>
