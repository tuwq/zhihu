<template>
 	<div id="detail-main-wrapper">
 		<div class="detail-main">
 			<div class="main-left">
 				<div>
 					<answers-add></answers-add>
 					<answers-list :sum="sum" :no_more_data="no_more_data"></answers-list>
 				</div>
 			</div>
 			<div class="main-right"></div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import answersAdd from 'detail_components/answers-add.vue';
	import answersList from 'detail_components/answers-list.vue';
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
			'answers-list': answersList
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/detail-main.less');
</style>
