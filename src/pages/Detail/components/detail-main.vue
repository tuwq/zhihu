<template>
 	<div id="detail-main-wrapper">
 		<div class="detail-main">
 			<div class="main-left">
 				<div>
 					<answers-add
 					:question="question"></answers-add>
 					<answers-list 
 					:question="question"
 					:answerSum="answerSum" 
 					:no_more_data="no_more_data" 
 					:answerList="answerList"
 					:loading="loading"></answers-list>
 				</div>
 			</div>
 			<div class="main-right" v-show="!loading">
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
		props: {
			answerSum: {
				type: Number,
				default: 0
			},
			no_more_data: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: true
			},
			question: {
				type: Object,
				default: null
			},
			answerList: {
				type: Array,
				default: []
			}
		},
		components: {
			'answers-add': answersAdd,
			'answers-list': answersList,
			author
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/detail-main.less');
</style>
