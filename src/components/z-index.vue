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
	import questions from 'components/questions.vue';
	import sends from 'components/sends.vue';
	import help from 'components/help.vue';
	import author from 'components/author.vue';
	import myInfo from 'components/myInfo.vue';
	export default {
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
