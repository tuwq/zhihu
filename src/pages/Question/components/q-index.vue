<template>
 	<div class="index-wrapper">
 		<div class="center">
 			<div class="index-left">
 				<selection-bar></selection-bar>
 			</div>
 			<div class="index-right">
 				<msgs></msgs>
 			</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import msgs from 'question_components/msgs.vue';
	import SelectionBar from 'question_components/selection-bar.vue';
	export default {
		components: {
			msgs,
			SelectionBar
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/q-index.less');
</style>
