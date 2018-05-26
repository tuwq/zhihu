<template>
 	<div class="scroll-header-wrapper" v-if="detail_question">
 		<div class="content">
 			<div class="content-left">
 				<h1 class="title">{{detail_question.title}}</h1>
 			</div>
 			<div class="content-right">
 				<div class="group">
 					<button class="attention" type="button" v-show="detail_question.attentionStatus==0"
 					@click.stop.prevent="attention(detail_question._id,1)">关注问题</button>
	 				<button class="attention cancel" v-show="detail_question.attentionStatus==1" type="button" 
	 				@click.stop.prevent="attention(detail_question._id,0)" 
	 						style="color: #fff;background-color: #8590a6;"
	 				@mouseenter="enter($event)" @mouseleave="leave($event)">已关注</button>
 					<button class="invite" type="button"><svg viewBox="0 0 12 12" width="14" height="16">
 						<title></title><g><path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"></path></g>	
 					</svg>写回答</button>
 				</div>
 			</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
import {mapMutations,mapGetters} from 'vuex';
import {copyObj} from 'common/js/util'
import axios from 'axios'
	export default {
		methods: {
			enter(e) {
				e.target.innerText = '取消关注'
			},
			leave(e) {
				e.target.innerText = '已关注'
			},
			attention(question_id,attentionStatus) {
				axios.post('/attention/question/add',{
					question_id: question_id,
					status: attentionStatus
				}).then((res)=> {
					// 修改detail_question状态
					this.setDetailQuestionAttentionStatus(attentionStatus)
				})
			},
			...mapMutations({
				setDetailQuestion: 'SET_DETAIL_QUESTION',
				setDetailQuestionAttentionStatus:'SET_DETAIL_QUESTION_ATTENTIONSTATUS',
			})
		},
		computed: {
			...mapGetters([
				'detail_question'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/scroll-header.less');
</style>
