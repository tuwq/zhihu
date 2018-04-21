<template>
 	<div id="question-main-wrapper">
 		<div class="question-main">
 			<div class="main-left">
 				<div>
 					<answers-add></answers-add>
 					<div class="question-list"></div>
 				</div>
 			</div>
 			<div class="main-right"></div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import answersAdd from 'detail_components/answers-add.vue';
	export default {
		components: {
			'answers-add': answersAdd
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/question-main.less');
</style>
