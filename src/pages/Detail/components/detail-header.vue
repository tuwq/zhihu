<template>
 	<div class="detail-header-wrapper">
 		<div>
	 		<div class="header-content">
	 			<div class="left-main">
	 				<div class="main-tags" v-if="question.category">
	 					<div class="main-topics">
	 						<div class="tag">
	 							<span class="tag-content"><a class="topicLink" href="javascript:void(0)">
	 								<div class="popover">
	 									<div class="popover-item">{{question.category.content}}</div>
	 								</div>
	 							</a></span>
	 						</div>
	 					</div>
	 				</div>
	 				<h1 class="main-title">{{question.title}}</h1>
	 				<div>
	 					<div class="main-detail">
	 						<div class="rich-collapsed">
	 							<div><span></span></div>
	 						</div>
	 					</div>
	 				</div>
	 			</div>
	 			<div class="right-side">
	 				<div class="header-status">
	 					<div class="status-counts">
	 						<div class="attention" @click.stop.prevent="openAttention(question._id)">
	 							<div class="inner">
	 								<div class="item-name">关注者</div>
	 								<strong class="item-value">{{attentionSum}}</strong>
	 							</div>
	 						</div>
	 						<div class="browsed">
	 							<div class="inner">
	 								<div class="item-name">被浏览</div>
	 								<strong class="item-value">{{browseSum}}</strong>
	 							</div>
	 						</div>
	 					</div>
	 				</div>
	 			</div>
	 		</div>
	 		<div class="header-footer">
	 			<div class="footer-inner">
	 				<div class="inner-main">
	 					<div class="button-group">
	 						<button class="button button1" type="button" v-show="attentionStatus==0" @click.stop.prevent="attention(question._id,1)">关注问题</button>
	 						<button class="button button1 cancel" v-show="attentionStatus==1" type="button" 
							@mouseenter="enter($event)" @mouseleave="leave($event)"
	 						@click.stop.prevent="attention(question._id,0)" 
	 						style="color: #fff;background-color: #8590a6;">已关注</button>
	 						<button class="button button2" @click.stop.prevent="openAdd"><svg viewBox="0 0 12 12" width="14" height="16" class="icon"><title></title><g><path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"></path></g></svg>写回答</button>
	 					</div>
	 					<div class="actions">
	 						<div class="commentCount" >
	 							<button class="commentBtn" type="button" @click.stop.prevent="openComment($event)"><span>
	 								&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
	 									<path d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z"></path>
	 								</svg>
	 							</span>{{question.cCount}}条问题评论</button>
	 						</div>
	 						<div class="share-menu">
	 							<div>
	 								<img src="https://www.zhihu.com/qrcode?url=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F267262437%23showWechatShareTip" alt="微信二维码">
	 								<button class="shareBtn">
	 									<span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
	 										<path d="M2.931 7.89c-1.067.24-1.275 1.669-.318 2.207l5.277 2.908 8.168-4.776c.25-.127.477.198.273.39L9.05 14.66l.927 5.953c.18 1.084 1.593 1.376 2.182.456l9.644-15.242c.584-.892-.212-2.029-1.234-1.796L2.93 7.89z"></path>
	 									</svg></span>分享
	 								</button>
	 							</div>
	 						</div>
	 						<button class="invite">
	 							<span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
									<path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z"></path>
								</svg></span>邀请回答
	 						</button>
	 						<button class="report">
	 							<span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
									<path d="M19.947 3.129c-.633.136-3.927.639-5.697.385-3.133-.45-4.776-2.54-9.949-.888-.997.413-1.277 1.038-1.277 2.019L3 20.808c0 .3.101.54.304.718a.97.97 0 0 0 .73.304c.275 0 .519-.102.73-.304.202-.179.304-.418.304-.718v-6.58c4.533-1.235 8.047.668 8.562.864 2.343.893 5.542.008 6.774-.657.397-.178.596-.474.596-.887V3.964c0-.599-.42-.972-1.053-.835z"></path>
								</svg></span>举报
	 						</button>
	 						<div class="popover">
	 							<button>
	 								<span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
									<path d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
								</svg></span>
	 							</button>
	 						</div>
	 					</div>
	 					<div class="actions-all"></div>
	 				</div>
	 			</div>
	 		</div>
	 		<div class="comments-wrapper">
				<comments :question_id="question._id" fromType="question" @incrCount="question.cCount++" :cCount="question.cCount" class="comment" 
				v-if="loadComment"
				ref="comment"></comments>
	 		</div>
	 	</div>
 	</div>
</template>

<script type="text/ecmascript-6">
import {mapMutations,mapGetters} from 'vuex';
import loading from 'base/loading.vue'
import comments from 'base/comments.vue'
import axios from 'axios'
import {communicationMixin} from 'common/js/mixin'
	export default {
		mixins: [communicationMixin],
		props: {
			attentionSum: {
				type: Number,
				default: 0
			},
			attentionStatus: {
				type: Number,
				default: 0
			},
			browseSum: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				attentionText: '已关注',
				loadComment: false
			}
		},
		methods: {
			enter(e) {
				e.target.innerText = '取消关注'
			},
			leave(e) {
				e.target.innerText = '已关注'
			},
			attention(question_id,status) {
				axios.post('/attention/question/add',{
					user_id: this.user._id,
					question_id: question_id,
					status: status
				}).then((res)=> {
					this.$emit('changeAttention',res.data.status==1?1:0)
				})
			},
			openAttention(question_id) {
				communicationMixin.$emit('openAttention',question_id)
				this.setAttentionQuestionModal(true)
			},
			openAdd() {
				this.setAddAnswerStatus(!this.add_answer_status)
			},
			openComment(e) {
				this.loadComment = true
				$(e.target).text().trim()=='收起评论'?$(e.target).text(this.question.cCount+'条问题评论'):$(e.target).text('收起评论')
				$('.comment').toggle()
			},
			...mapMutations({
				setAddAnswerStatus: 'SET_ADD_ANSWER_STATUS',
				setAttentionQuestionModal: 'SET_ATTENTION_QUESTION_MODAL',
			})
		},
		components: {
			loading,
			comments
		},
		computed: {
			...mapGetters([
				'question',
				'add_answer_status',
				'user'
			])
		},
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/detail-header.less');
</style>
