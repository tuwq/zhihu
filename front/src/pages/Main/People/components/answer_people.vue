<template>
 	<div id="item">
		<div class="list-item">
			<div class="ContentItem">
				<div class="Content-title ">
					<router-link :to="{path:`/question/${item.question_id}` }">{{item.questionTitle}}?</router-link></div>
				<div class="Content-meta">
					<div class="authorInfo">
						<span class="avatarLink" v-if="people_detail_user.avatar"><img :src="imageServer+people_detail_user.avatar" width="38" height="38" class="Avatar"></span>
						<div class="author-content">
							<div class="authorInfo-head">
								<a class="user-link">{{people_detail_user.username}}</a>
							</div>
							<div class="authorInfo-detail" v-if="people_detail_user.info">
								<div class="authorInfo-badge">
									<div class="AuthorInfo-badgeText">{{people_detail_user.info.intro}}</div> 	
								</div>
							</div>
						</div>
					</div>
					<div class="extraInfo">
						 <div class="Voters">
						 	<button>{{item.good}} 人赞同了该回答</button>
						 </div>
					</div>
				</div>
				<div class="RichContent">
					<div class="RichContent-inner">
						<span class="RichText">{{item.content}}</span>
						<span class="over-text"></span>
						<button class="ContentItem-more" @click.stop.prevent="readAll($event)">阅读全文</button>
					</div>
					<div class="ContentItem-actions">
					<span>
						<button :class="{up: true,'is-active': item.voteStatus==1}"
						@click.stop.prevent="vote(1,item._id)"><svg fill="currentColor" viewBox="0 0 20 18" width="9" height="16">
							<g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
						</svg>{{item.good}}</button>
						<button :class="{down: true,'is-active': item.voteStatus==2}"
						@click.stop.prevent="vote(2,item._id)"><svg fill="currentColor" viewBox="0 0 20 18" width="9" height="16" style="transform: rotate(180deg);">
							<g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
						</svg>{{item.bad}}</button>
					</span>
					<button class="ContentItem-action" @click.stop.prevent="openComment($event,item.commentSum)">
						<span class="">
						{{item.commentSum}} 条评论</span>
					</button>
					<button class="ContentItem-action">
						<span class="">&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2.931 7.89c-1.067.24-1.275 1.669-.318 2.207l5.277 2.908 8.168-4.776c.25-.127.477.198.273.39L9.05 14.66l.927 5.953c.18 1.084 1.593 1.376 2.182.456l9.644-15.242c.584-.892-.212-2.029-1.234-1.796L2.93 7.89z"></path></svg>分享</span>
					</button>
					<button class="ContentItem-action">
						<span class="">&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z"></path></svg>收藏</span>
					</button>
					<button class="ContentItem-action">
						<span class="">&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2 8.437C2 5.505 4.294 3.094 7.207 3 9.243 3 11.092 4.19 12 6c.823-1.758 2.649-3 4.651-3C19.545 3 22 5.507 22 8.432 22 16.24 13.842 21 12 21 10.158 21 2 16.24 2 8.437z"></path></svg>感谢</span>
					</button>
					<button class="ContentItem-action">
						<span class="">&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path></svg></span>
					</button>
					</div>
				</div>
			</div>
			<comments 
			v-if="CommentsLoadStatus"
			fromType="answer" 
			@incrAnswerCommentSum="item.commentSum++"
			:commentSum="item.commentSum" 
			:index="index" 
			:answer_id="item._id" 
			:question_id="item.question_id">
			</comments>
		</div>
	</div>
</template>

<script type="text/ecmascript-7">
import moment from 'moment'  
import axios from 'axios'
import comments from 'base/comments.vue';
import {mapMutations,mapGetters} from 'vuex';
import { voteAnswerApi } from 'api/vote'
	export default {
		props: {
			item: {
				type: Object,
				default: null
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				imageServer: global.imgServer,
				// base: '../../../../../static/avatar/38/',
				CommentsLoadStatus: false,
			}
		},
		methods: {
			openComment(e) {
				$(e.target).text().trim()=='收起评论'
				?$(e.target).text(this.item.commentSum + ' 条评论')
				:$(e.target).text('收起评论')
				this.CommentsLoadStatus = !this.CommentsLoadStatus
			},
			vote(vote,answer_id){
				voteAnswerApi({
					answer_id: answer_id,
					vote: vote
				}, (res)=>{
					if (res.data.status==-1) {
						// 取消赞踩
						this.item.voteStatus = 0
						vote==1?this.item.good--:this.item.bad--	
					}else if(res.data.status === 0){
						// 新建
						vote==1?this.item.good++:this.item.bad++
						vote==1?this.item.voteStatus=1:this.item.voteStatus=2
					}else {
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
		},
		computed: {
			...mapGetters([
				'people_detail_user'
			])
		},
		components: {
			comments
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/answer-people.less');
</style>
