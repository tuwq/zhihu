<template>
 	<div id="Detail" @click.stop="clsModal" >
 		<loading v-show="total_loading"></loading>
	    <div>
    		<d-header class="d-header" ref="dHeader" v-if="question">
	 			<z-header slot="z-header"></z-header>
		 		<detail-header slot="detail-header"
		 		v-show="!total_loading" 
		 		@changeAttention="changeAttention" 
		 		:attentionSum="attentionSum" 
		 		:attentionStatus="attentionStatus" 
		 		:browseSum="browseSum"
		 		:question="question"
		 		 ></detail-header>
		 		<scroll-header slot="scroll-header" 
		 		@changeAttention="changeAttention"
		 		:attentionStatus="attentionStatus" 
		 		:question="question"
		 		></scroll-header>
	 		</d-header>
	 		<div class="main-content">
	 			<detail-main 
	 			:answerSum="answerSum" 
	 			:question="question"
	 			:answerList="answerList" 
	 			:no_more_data="no_more_data" 
	 			:loading="loading"
	 			></detail-main>
	 		</div>
	 		<div class="special">
				<view-conversation></view-conversation>
				<remind-list 
				:reminds="['suggest','toTop']"></remind-list>
				<z-drop></z-drop>
				<attention></attention>
		    </div>
	    </div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import zDrop from 'z_components/zDrop.vue';
	import ZHeader from 'z_components/z-header.vue';
	import detailHeader from 'detail_components/detail-header.vue';
	import scrollHeader from 'detail_components/scroll-header.vue';
	import dHeader from 'detail_components/d-header.vue';
	import attention from 'detail_components/attention.vue';
	import detailMain from 'detail_components/detail-main.vue';
	import viewConversation from 'detail_components/view-conversation.vue'; 
	import remindList from 'base/remind-list.vue';
	import loading from 'base/loading.vue'
	import axios from 'axios'
	import {prepend,mergeData,extend} from 'common/js/common'
	import {mapMutations,mapGetters} from 'vuex';
	import {communicationMixin} from 'common/js/mixin'
	import {readBrowseCount,MessageListener} from 'socket/browse'

	export default {
		data() {
			return {
				question: null,
				preFrom: '',
				preTo: '',
				limit: 5,
				page: 1,
				pend: false, // 加载工作中
				no_more_data: false, // 没有更多数据了
				answerList: [],
				answerSum: 0,
				// 加载回答列表数据
				loading: true,
				attentionSum: 0,
				attentionStatus: 0,
				// 加载问题详情数据
				total_loading: true,
				browseSum: 0,
				first: true
			}
		},
		components: {
			'z-header': ZHeader,
			'detail-header': detailHeader,
			'scroll-header': scrollHeader,
			'd-header': dHeader,
			'detail-main': detailMain,
			'view-conversation': viewConversation,
			'remind-list': remindList,
			'z-drop': zDrop,
			'attention': attention,
			 loading
		},
		methods: {
			changeAttention(status) {
				status==1?this.attentionSum++:this.attentionSum--
				this.attentionStatus = status==1?1:0
			},
			clsModal() {
	          this.setIndexDropDown(false)
	        },
			getDetail() {
				axios.post('/question/detail',{
					question_id: this.question_id
				}).then((res)=> {
					if (res.data.status) {
						// 转到404
					}
					let questionUser = extend(res.data.result.targetUser,res.data.result.info)
					this.setQuestionUser(questionUser)
					this.question = res.data.result.question
					this.attentionSum =  res.data.result.followSum
					this.attentionStatus =  res.data.result.attentionStatus
					readBrowseCount(this.question_id)
					this.getAnswers()
				})
			},
			getAnswers() {
				this.pend = true
				axios.post('/answer/read',{
					question_id: this.question_id,
					limit: this.limit,
					page: this.page
				}).then((res)=> {
					this.loading = false
					this.total_loading = false
					this.first = false
					if(res.data.result.RemainingCount) {
						let data = mergeData(res.data.result.answers,res.data.result.infos)
						this.answerList = this.answerList.concat(data)
						this.answerSum = res.data.result.answerSum
						this.page++
					}else{
						this.no_more_data = true
					}
					this.pend = false
				})
			},
			listenData() {
				communicationMixin.$on('incrAnswerCommentSum',(index)=> {
					this.answerList[index].commentSum++;
				})
				communicationMixin.$on('incrDetailQuestionCommentSum',()=> {
					this.question.commentSum++
				})
				// 当增加问题后
				communicationMixin.$on('addAnswer',()=> {
					this.answerList = []
					this.page = 1
					this.loading = true
					this.getAnswers()
				})
				// 访问量变化
				MessageListener('browseSum',(data)=> {
					this.browseSum = data
				})
				// 加载更多数据
				var $win = $(window)
				$win.on('scroll',()=> {
					if($win.scrollTop()-($(document).height()-$win.height())>-30){
		                if (this.pend||this.no_more_data||this.first) {
		                	return
		                }
		                this.getAnswers()
		            }
				})
			},
			...mapMutations({
				setIndexDropDown: 'SET_INDEX_DROPDOWN',
				setQuestionUser: 'SET_QUESTION_USER'
			})
		},
		created() {
			this.listenData()
			this.getDetail()
		},
		computed: {
			question_id() {
				return this.$route.params.question_id
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/Detail.less');
</style>
