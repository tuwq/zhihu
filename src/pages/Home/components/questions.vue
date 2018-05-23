<template>
 	<div class="questions" v-if="questionList">
		
		<loading v-show="loading"></loading>

		<question v-for="(item,index) in questionList" :key="item._id" :item="item" :index="index" 
				:questionList="questionList"></question>	

 		<div style="text-align: center;" v-show="no_more_data"><h1>没有更多数据了</h1></div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import question from 'z_components/question.vue'
	import loading from 'base/loading.vue'
	import axios from 'axios'
	import {prepend,mergeData} from 'common/js/common'
	import {communicationMixin} from 'common/js/mixin'
	export default {
		mixins: [communicationMixin],
		data() {
			return {
				limit: 5,
				questionList: [],
				pend: false, // 加载工作中
				no_more_data: false, // 没有更多数据了
				page: 1,
				loading: true,
				first: true
			}
		},
		components: {
			question,
			loading
		},
		methods: {
			getQuestionList() {
				this.pend = true
				axios.post('/question/read',{
					limit: this.limit,
					page: this.page
				}).then((res)=> {
					console.log('questioRemainingCount ',res.data.result.RemainingCount)
					if(res.data.result.RemainingCount) {	
						let data =  mergeData(res.data.result.questions,res.data.result.infos)
						this.questionList = this.questionList.concat(data)
						this.page++
						this.first = false
						this.loading = false
					}else{
						this.no_more_data = true
					}
					this.pend = false	// 可以继续工作
				})
			},
			loadData() {
				// 加载更多数据
				var $win = $(window)
				$win.on('scroll',()=> {
					if($win.scrollTop()-($(document).height()-$win.height())>-30){
		                if (this.pend||this.no_more_data||this.first) {
		                	return
		                }
		                this.getQuestionList()
		            }
				})
				// 添加新的问题后
				communicationMixin.$on('addQuestion',()=> {
					this.questionList = []
					this.page = 1
					this.loading = true
					this.getQuestionList()
				})
			}
		},
		created() {
			// 瀑布流监听滚动事件更新数据
			this.loadData()
			this.getQuestionList(1)
		},
		// watch: {
		//     '$route' (to, from) {
		// 	   if ( to.path == '/home' && from.path != to.path ) {
		// 	   		this.questionList = []
		// 	   		this.loading = true
		// 	   		this.page = 1
		// 	   		this.getQuestionList()
		// 	   }
		// 	}
		// }
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/questions.less');
</style>
