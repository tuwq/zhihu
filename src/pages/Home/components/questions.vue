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
	import {prepend} from 'common/js/common'
	export default {
		data() {
			return {
				limit: 5,
				questionList: [],
				pend: false, // 加载工作中
				no_more_data: false, // 没有更多数据了
				page: 1,
				loading: true
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
					this.loading = false
					if(res.data.result.count) {	
						this.questionList = this.questionList.concat(res.data.result.questions)
						this.page++
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
		                if (this.pend||this.no_more_data) {
		                	return
		                }
		                this.getQuestionList()
		            }
				})
			}
		},
		created() {
			this.getQuestionList(1)
			// 瀑布流监听滚动事件更新数据
			this.loadData()
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/questions.less');
</style>
