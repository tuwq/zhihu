<template>
 	<div id="Detail" @click.stop="clsModal" >
 		<loading v-show="loading"></loading>
	    <div v-show="detail_loading">
    		<d-header class="d-header">
	 			<z-header slot="z-header"></z-header>
		 		<detail-header slot="detail-header" :attentionSum="attentionSum" :attentionStatus="attentionStatus"  @changeAttention="changeAttention" v-show="detail_loading" :browseSum="browseSum"></detail-header>
		 		<scroll-header slot="scroll-header" :attentionStatus="attentionStatus" @changeAttention="changeAttention"></scroll-header>
	 		</d-header>
	 		<div class="main-content">
	 			<detail-main :sum="sum" :no_more_data="no_more_data" :loading="loading"></detail-main>
	 		</div>
	 		<div class="special">
				<view-conversation></view-conversation>
				<remind-list :reminds="['suggest','toTop']"></remind-list>
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
	import {prepend,mergeData} from 'common/js/common'
	import {mapMutations,mapGetters} from 'vuex';
	import {communicationMixin} from 'common/js/mixin'
	import {readBrowseCount,MessageListener} from 'socket/browse'

	export default {
		mixins: [communicationMixin],
		data() {
			return {
				preFrom: '',
				preTo: '',
				limit: 5,
				page: 1,
				pend: false, // 加载工作中
				no_more_data: false, // 没有更多数据了
				answerList: [],
				sum: 0,
				loading: true,
				attentionSum: 0,
				attentionStatus: 0,
				detail_loading: false,
				browseSum: 0
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
			...mapMutations({
				setQuestion: 'SET_QUESTION',
				setAnswers: 'SET_ANSWERS',
				setIndexDropDown: 'SET_INDEX_DROPDOWN',
			}),
			changeAttention(status) {
				status==1?this.attentionSum++:this.attentionSum--
				this.attentionStatus = status==1?1:0
			},
			clsModal() {
	          this.setIndexDropDown(false)
	        },
			getDetail(user) {
				axios.post('/question/detail',{
					question_id: this.question_id
				}).then((res)=> {
					if (res.data.status) {
						// 转到404
					}
					this.setQuestion(res.data.result.question)
					this.attentionSum =  res.data.result.followSum
					this.attentionStatus =  res.data.result.attentionStatus
					this.detail_loading = true
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
					this.sum = res.data.result.sum
					if(res.data.result.count) {
						let data = mergeData(res.data.result.answers,res.data.result.infos)
						this.answerList = this.answers.concat(data)
						this.setAnswers(this.answerList)
						this.page++
					}else{
						this.no_more_data = true
					}
					this.pend = false
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
		                this.getAnswers()
		            }
				})	
				communicationMixin.$on('addAnswer',()=> {
					this.answerList = []
					this.setAnswers(this.answerList)
					this.page = 1
					this.loading = true
					this.getAnswers()
				})
				MessageListener('browseSum',(data)=> {
					this.browseSum = data
				})
				communicationMixin.$on('changeUser',()=> {
					
				})
			},
			getBrowseCount() {
				readBrowseCount(this.question_id)
			}
		},
		created() {
			this.getDetail()
			this.getAnswers()
			this.loadData()
			this.getBrowseCount()
		},
		watch: {
			question_id(newval,oldval) {
				if (newval != oldval && newval!=undefined) {
					this.detail_loading = false
					this.getDetail()
					this.getBrowseCount()
					this.answerList = []
					this.setAnswers(this.answerList)
					this.page = 1
					this.loading = true
					this.getAnswers()
				}
			}
		},
		computed: {
			question_id() {
				return this.$route.params.question_id
			},
			...mapGetters([
				'question',
				'answers'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/Detail.less');
</style>
