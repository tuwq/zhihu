<template>
 	<div class="index-wrapper">
 		<div class="center">
 			<div class="index-left">
 				<sends></sends>
 				<questions></questions>
 			</div>
 			<div class="index-right">
 				<help></help>
				<myInfo></myInfo>
 			</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import questions from 'z_components/questions.vue';
	import sends from 'z_components/sends.vue';
	import help from 'z_components/help.vue';
	import author from 'z_components/author.vue';
	import myInfo from 'z_components/myInfo.vue';
	export default {
		created() {
			console.log(' z-index ')
		},
		components: {
			questions,
			sends,
			help,
			myInfo
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/z-index.less');
</style>
