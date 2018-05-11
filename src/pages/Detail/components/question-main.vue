<template>
 	<div id="question-main-wrapper">
 		<div class="question-main">
 			<div class="main-left">
 				<div>
 					<answers-add></answers-add>
 					<question-list :sum="sum" :no_more_data="no_more_data"></question-list>
 				</div>
 			</div>
 			<div class="main-right"></div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import answersAdd from 'detail_components/answers-add.vue';
	import questionList from 'detail_components/question-list.vue';
	export default {
		props: {
			sum: {
				type: Number,
				default: 0
			},
			no_more_data: {
				type: Boolean,
				default: false
			}
		},
		components: {
			'answers-add': answersAdd,
			'question-list': questionList
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/question-main.less');
</style>
