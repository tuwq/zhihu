<template>
 	<div id="questionItem" v-if="item"> 		
	<!--  动态列表数据模板不一致
		// 动态类型 type
		// 1:问题相关 2:回答相关	3:评论相关
		// 动作类型 action
		// 1:提出	2:关注	3:点赞
		回答了问题(2,1)和赞同回答(2,3)相同
		添加了问题(1,1)和关注问题(1,2)和赞同问题(1,3)相同
		 -->
 		<div class="list-item" v-if="item.type==2">
			<div class="item-meta-box">
				<div class="item meta-inner">
					<span class="meta-title">{{item.action==1?'回答了问题':item.action==3?'赞同了回答':''}}</span><span>{{updatedAt}}</span>
				</div>
			</div>
			<div class="item-answer-box">
				<h2 class="answer-title-box"><div>
					<router-link :to="{path:`/question/${item.question_id}` }">{{item.title}}?</router-link>
				</div></h2>
				<div class="answer-meta-box" v-if="item.user">
					<div class="header-info-box">
						<span class="avatar-inner"
						@click.stop.prevent="toUser(item.user)"><img class="Avatar" :src="base+item.user.avatar" width="38" height="38"></span>
						<div class="author-box">
							<div class="author-header"><span class="link-name"
								@click.stop.prevent="toUser(item.user)">{{item.user.username}}</span></div>
							<div class="author-detail"></div>
						</div>
					</div>
					<div class="extral-info-box">
						<span class="voter-inner"><button>{{item.good}}人赞同了该回答</button></span>
					</div>
				</div>
				<div class="answer-content-box">
					<div class="richContent-box">
						<div>
							<span class="content-text" ref="contentText">{{item.content}}</span>
							<span class="all-text" ref="allText"></span>
							<button class="getMore" @click.stop.prevent="more($event)">
								阅读全文
							</button>
						</div>
					</div>
					<div class="richAction-box">
						<span>
							<button 
							:class="{voteBtn:true,up: true,'is-active':item.voteStatus==1}"
							@click.stop.prevent="vote(1,item.answer_id)"><svg viewBox="0 0 20 18" width="9" height="16">
								<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
							</svg>{{item.good}}</button>
							<button 
							:class="{voteBtn:true,down: true,'is-active':item.voteStatus==2}"
							@click.stop.prevent="vote(2,item.answer_id)"><svg viewBox="0 0 20 18" width="9" height="16">
								<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
							</svg>{{item.bad}}</button>
						</span>
						<button  class="action-item" @click.stop.prevent="openComment($event)">{{item.commentSum}} 条评论</button>
						<button class="action-item"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2.931 7.89c-1.067.24-1.275 1.669-.318 2.207l5.277 2.908 8.168-4.776c.25-.127.477.198.273.39L9.05 14.66l.927 5.953c.18 1.084 1.593 1.376 2.182.456l9.644-15.242c.584-.892-.212-2.029-1.234-1.796L2.93 7.89z"></path></svg></span>分享</button>
						<button class="action-item"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z"></path></svg></span>收藏</button>
						<button class="action-item"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2 8.437C2 5.505 4.294 3.094 7.207 3 9.243 3 11.092 4.19 12 6c.823-1.758 2.649-3 4.651-3C19.545 3 22 5.507 22 8.432 22 16.24 13.842 21 12 21 10.158 21 2 16.24 2 8.437z"></path></svg></span>感谢</button>
						<button class="action-item"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path></svg></span></button>
					</div>
				</div>
			</div>
			<comments 
			ref="comments"
			v-if="CommentsLoadStatus"
			fromType="answer"
			:commentSum="item.commentSum"
			:index="index"
			:answer_id="item.answer_id"
			:question_id="item.question_id"
			></comments>
		</div>
		<div class="list-item" v-if="item.type==1">
			<div class="item-meta-box">
				<div class="item meta-inner">
					<span class="meta-title">{{item.action==1?'添加':item.action==2?'关注':item.action==3?'赞同':''}}了问题</span><span>{{updatedAt}}</span>
					}
				</div>
			</div>
			<div class="item-answer-box">
				<h2 class="answer-title-box"><div>
					<router-link :to="{path:`/question/${item.question_id}` }">{{item.title}}?</router-link>
				</div></h2>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-7">
import comments from 'base/comments.vue'
import {periodWrap} from 'common/js/common.js';
import moment from 'moment' 
import {userMixin} from 'common/js/mixin'
import axios from 'axios'
	export default {
		mixins: [userMixin],
		props: {
			item: {
				type: Object,
				default: {}
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				base: '../../../static/avatar/38/',
				updatedAt: moment(this.item.meta.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
				CommentsLoadStatus: false
			}
		},
		methods: {
			vote(vote,answer_id){
				axios.post('/vote/answer',{
					answer_id: answer_id,
					vote: vote
				}).then((res)=> {
					if (res.data.status==1) {
						// 新建
						vote==1?this.item.good++:this.item.bad++
						vote==1?this.item.voteStatus=1:this.item.voteStatus=2
					}else if(res.data.status === 2){
						// 取消赞踩
						this.item.voteStatus = 0
						vote==1?this.item.good--:this.item.bad--	
					}else if( res.data.status == 3 ){
						// 改变
						if (vote==1) {
							this.item.good++
							this.item.bad--
							this.item.voteStatus=1
						}else {
							this.item.bad++
							this.item.good--
							this.item.voteStatus=2
						}
						this.item.good<0?0:this.item.good
						this.item.bad<0?0:this.item.bad
					}
				})
			},
			// 阅读全文
			more(e) {
				if ($(e.target).text().trim()=='阅读全文') {
					$(e.target).text('收起')
					periodWrap($(this.$refs.contentText),$(this.$refs.allText));
				}else {
					var text = $(this.$refs.allText).children().text();
					$(this.$refs.contentText).text(text);
					$(this.$refs.allText).empty();
				 	$(e.target).text('阅读全文')
				}
			},
			openComment(e) {
				// 打开评论列表
				$(e.target).text().trim()=='收起评论'
				?$(e.target).text(this.item.commentSum + ' 条评论')
				:$(e.target).text('收起评论')
				this.CommentsLoadStatus = !this.CommentsLoadStatus
			}
		},
		components: {
			comments
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./baseLess/dynamicItem.less');
</style>
