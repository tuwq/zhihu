<template>
 	<div class="answers-wrapper">
 		<div class="card">
 			<div class="list" v-if="answerList.length>0">
 				<div class="list-header">
 					<h4 class="list-headerText"><span>{{answerSum}}个回答</span></h4>
 					<div class="list-headerOptions">
 						<div class="popover">
 							<button class="Sorting">默认排序<span>&#8203;<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 16.183l2.716-2.966a.757.757 0 0 1 1.064.001.738.738 0 0 1 0 1.052l-3.247 3.512a.758.758 0 0 1-1.064 0L8.22 14.27a.738.738 0 0 1 0-1.052.758.758 0 0 1 1.063 0L12 16.183zm0-9.365L9.284 9.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l3.248-3.512a.758.758 0 0 1 1.065 0L15.78 8.73a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063.001L12 6.818z"></path></svg></span></button>
 						</div>
 					</div>
 				</div>
 				<div>
 					<div class="">									
						<answer v-for="(item,index) in answerList" 
						:item="item" 
						:index="index" 
						:key="item._id"
						:question="detail_question"></answer>
 					</div>
 				</div>
 			</div>
 			<loading v-show="loading"></loading>
 		</div>
 		<div style="text-align: center;" v-show="no_more_data"><h1>没有更多数据了</h1></div>
 	</div>
</template>

<script type="text/ecmascript-6">
import answer from 'detail_components/answer.vue'
import {mapMutations,mapGetters} from 'vuex'
import {mergeData} from 'common/js/common'
import axios from 'axios'
import loading from 'base/loading.vue'
import {communicationMixin} from 'common/js/mixin'
import {readBrowseCount,MessageListener} from 'socket/browse'
	export default {
		data() {
			return {
				limit: 5,
				page: 1,
				pend: false, // 加载工作中
				no_more_data: false, // 没有更多数据了
				answerList: [],
				answerSum: 0,
				loading: true,
				first: true
			}
		},
		computed: {
			...mapGetters([
				'detail_question'
			])
		},
		methods: {
			getAnswers() {
				this.pend = true
				axios.post('/answer/read',{
					question_id: this.question_id,
					limit: this.limit,
					page: this.page
				}).then((res)=> {
					this.first = false
					this.loading = false
					if( res.data.result.answers.length > 0 ) {
						let data = res.data.result.answers
						this.answerList = this.answerList.concat(data)
						this.answerSum = res.data.result.answerSum
						this.page++
					}else{
						this.no_more_data = true
					}
					this.pend = false
				})
			},
			listener() {
				// 当增加问题后
				communicationMixin.$on('addAnswer',()=> {
					this.answerList = []
					this.page = 1
					this.loading = true
					this.getAnswers()
				})
				
			},
			loadMore() {
				const $win = $(window)
				if($win.scrollTop()-($(document).height()-$win.height())>-30){
	                if (this.pend||this.no_more_data||this.first) {
	                	return
	                }
	                if ( this.$router.history.current.name == 'question_detail' ) {
	                	this.getAnswers()       
	                }    
	            }
			}
		},
		created() {
			this.getAnswers()
			this.listener()
		},
		mounted() {
			// 加载更多数据
			const $win = $(window)
			$win.on('scroll',this.loadMore)
		},
		beforeDestroy() {
			const $win = $(window)
			$win.off('scroll',this.loadMore)
		},
		computed: {
			question_id() {
				return this.$route.params.question_id
			},
			...mapGetters([
				'detail_question'
			])
		},
		components: {
			answer,
			loading
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/answers-list.less');
</style>
