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
		data() {
			return {
				limit: 10,
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
					this.first = false
					this.loading = false
					if(res.data.result.questions.length) {	
						let data =  mergeData(res.data.result.questions,res.data.result.infos)
						this.questionList = this.questionList.concat(data)
						this.page++	
					}else{
						this.no_more_data = true
					}
					this.pend = false	// 可以继续工作
				})
			},
			Listener() {
				// 加载更多数据
				var $win = $(window)
				$win.on('scroll',()=> {
					if($win.scrollTop()-($(document).height()-$win.height())>-30){
		                if (this.pend||this.no_more_data||this.first) {
		                	return
		                }
		                // 这个判断很重要
		                if ( this.$router.history.current.name == 'zIndex' ) {
		                	this.getQuestionList()
		                }
		               
		            }
				})
				// 添加新的问题后
				communicationMixin.$on('addQuestion',()=> {
					this.questionList = []
					this.page = 1
					this.loading = true
					this.no_more_data = false
					this.getQuestionList()
				})
			}
		},
		created() {
			// 瀑布流监听滚动事件更新数据
			this.Listener()
			this.getQuestionList(1)
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/questions.less');
</style>
