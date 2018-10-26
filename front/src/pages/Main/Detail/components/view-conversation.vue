<template>
 	<div class="mask" v-show="conversation_mask">
 		<div class="backdrop" @click.stop="clsModal"></div>
 		<div class="modal-fullPage">
 			<div class="Modal-inner">
 				<div class="Modal-content">
 					<div class="comments">
 						<div class="topBar">
 							<div class="topBar-title-box">
 								<h2 class="commentTopBar-title"><div>查看对话</div></h2>
 							</div>
 							<div class="topBar-options"></div>
 						</div>
 						<div class="commentList" v-if="conversationList">
 							<div class="CommentItem">
 								<div>
 									<div class="item-meta">
 										<span class="user-avatar-box"><a target="_blank"><img class="Avatar" src="../../../../common/image/index/user_avatar_question_detail.jpg" width="24" height="24">
 										</a></span>
 										<span class="user-name-box"><a href="">MrTreasure</a></span>
 										<span class="user-comment-time">一天前</span>
 									</div>
 									<div class="item-content">
 										<p>。。。</p>
 									</div>
 									<div class="item-footer">
 										<button class="comment-item-btn">
 											<svg fill="currentColor" viewBox="0 0 20 18" width="13" height="16">
 											<title></title><g><path d="M.718 7.024c-.718 0-.718.63-.718.63l.996 9.693c0 .703.718.65.718.65h1.45c.916 0 .847-.65.847-.65V7.793c-.09-.88-.853-.79-.846-.79l-2.446.02zm11.727-.05S13.2 5.396 13.6 2.89C13.765.03 11.55-.6 10.565.53c-1.014 1.232 0 2.056-4.45 5.83C5.336 6.965 5 8.01 5 8.997v6.998c-.016 1.104.49 2 1.99 2h7.586c2.097 0 2.86-1.416 2.86-1.416s2.178-5.402 2.346-5.91c1.047-3.516-1.95-3.704-1.95-3.704l-5.387.007z"></path></g></svg>1
 										</button>
 										<button class="comment-item-btn hover-btn">
 											<svg fill="currentColor" viewBox="0 0 20 18" width="13" height="16"
 											style="transform: rotate(180deg);">
 											<title></title><g><path d="M.718 7.024c-.718 0-.718.63-.718.63l.996 9.693c0 .703.718.65.718.65h1.45c.916 0 .847-.65.847-.65V7.793c-.09-.88-.853-.79-.846-.79l-2.446.02zm11.727-.05S13.2 5.396 13.6 2.89C13.765.03 11.55-.6 10.565.53c-1.014 1.232 0 2.056-4.45 5.83C5.336 6.965 5 8.01 5 8.997v6.998c-.016 1.104.49 2 1.99 2h7.586c2.097 0 2.86-1.416 2.86-1.416s2.178-5.402 2.346-5.91c1.047-3.516-1.95-3.704-1.95-3.704l-5.387.007z"></path></g></svg>踩
 										</button>
 										<button class="comment-item-btn hover-btn">
 											<svg fill="currentColor" viewBox="0 0 20 18" width="13" height="16">
 											<title></title><g><path d="M16.947 1.13c-.633.135-3.927.638-5.697.384-3.133-.45-4.776-2.54-9.95-.888C.305 1.04.025 1.664.025 2.646L0 18.807c0 .3.1.54.304.718.195.202.438.304.73.304.275 0 .52-.102.73-.304.202-.18.304-.418.304-.718v-6.58c4.533-1.235 8.047.668 8.562.864 2.343.893 5.542.008 6.774-.657.397-.178.596-.474.596-.887V1.964c0-.6-.42-.972-1.053-.835z"></path></g></svg>举报
 										</button>
 									</div>
 								</div>
 							</div>
 						</div>
 					</div>
 				</div>
 			</div>
 			<div class="Modal-closeButton" @click.stop="clsModal">
 				<svg class="closeIcon" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
 					<path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z"></path>
 				</svg>
 			</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
import { communicationMixin } from 'common/js/mixin'
import axios from 'axios'
import { commentGetConversationApi } from 'api/comment'
	export default {
		mixins: [communicationMixin],
		data() {
			return {
				conversationList: []
			}
		},
		methods: {
			clsModal() {
				this.setConversationMask(false)
			},
			getCommentChain(commentId) {
				commentGetConversationApi({
					commentId: commentId
				}, (res)=>{
					this.conversationList = res.data.result.conversation
				})
			},
			...mapMutations({
				setConversationMask: 'SET_CONVERSATION_MASK'
			})
		},
		computed: {
			...mapGetters([
				'conversation_mask'
			])
		},
		created() {
			communicationMixin.$on('openConversation',(commentId) => {
				this.getCommentChain(commentId)
				this.setConversationMask(true)
			})
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/view-conversation.less');
</style>
