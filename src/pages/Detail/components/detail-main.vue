<template>
 	<div id="detail-main-wrapper">
 		<div class="detail-main">
 			<div class="main-left">
 				<div>
 					<answers-add></answers-add>
 					<answers-list></answers-list>
 				</div>
 			</div>
 			<div class="main-right">
 				<author></author>
 			</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import answersAdd from 'detail_components/answers-add.vue';
	import answersList from 'detail_components/answers-list.vue';
	import author from 'detail_components/author.vue'
	export default {
		components: {
			answersAdd,
			answersList,
			author
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/detail-main.less');
</style>
