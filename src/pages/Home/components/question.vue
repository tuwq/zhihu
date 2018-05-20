<template>
 	<div class="question">
		<cls-bubble :index="index" :questionList="questionList"></cls-bubble>
		<div class="question-inner">
			<div class="header">
				<div class="oneLine">来自话题: <span><a target="_blank">{{item.category.content}}</a></span></div>
				<div class="twoLine" @click.stop.prevent="toUser(item.anonymousStatus==0?item.user_id:null)">
					<span class="user-avatar"><div class="Popover"><a class="user-avatar-link">
						<img class="avatar-img"  width="24" height="24" :src="item.anonymousStatus==0?base+item.user_id.avatar:base+'avatar.png'">
					</a></div></span>
					<div class="user-signature">
						<div class="name"><span class="info-name"><a>{{item.anonymousStatus==0?item.user_id.username:'匿名用户'}} ,</a></span></div>
						<div class="detail"><div class="info-badge"><div class="text">{{item.anonymousStatus==0?item.user_id.info.industry:''}}</div></div></div>
					</div>
				</div>
			</div>
			<div class="footer">
				<h2 class="title">
					<div>
						<router-link :to="{path:`/question/${item._id}` }">{{item.title}}?</router-link>
					</div>
				</h2>
				<div class="line"></div>
				<div class="content">
					<div class="content-inner">
						<span class="rich-text">{{item.desc}}</span>
						<span class="overflow-text"></span>
						<button class="content-more" @click.stop.prevent="more($event)">阅读全文<!-- <svg viewBox="0 0 10 6" width="10" height="16" v-show="!overflowStatus"><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg>
					<svg v-show="overflowStatus" viewBox="0 0 10 6" width="10" height="16" style="transform: rotate(180deg);"><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg> -->
						</button>
					</div>
					<div class="content-actions">
						<span>
						<button :class="{up: true,'is-active':item.voteStatus==1}" @click.stop="vote(1,item._id)"><svg viewBox="0 0 20 18" width="9" height="16">
							<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
						</svg>{{item.good}}</button>
						<button :class="{down: true,'is-active':item.voteStatus==2}" @click.stop="vote(2,item._id)"><svg viewBox="0 0 20 18" width="9" height="16">
							<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
						</svg>{{item.bad}}</button>
						</span>
						<button class="item-action" @click.stop.prevent="openComment($event,item.cCount)">
						<span class="">
						{{item.cCount||0}}条问题评论</span>
					</button>
					<button class="item-action">
						<span class="">&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2.931 7.89c-1.067.24-1.275 1.669-.318 2.207l5.277 2.908 8.168-4.776c.25-.127.477.198.273.39L9.05 14.66l.927 5.953c.18 1.084 1.593 1.376 2.182.456l9.644-15.242c.584-.892-.212-2.029-1.234-1.796L2.93 7.89z"></path></svg>分享</span>
					</button>
					<button class="item-action">
						<span class="">&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z"></path></svg>收藏</span>
					</button>
					<button class="item-action">
						<span class="">&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2 8.437C2 5.505 4.294 3.094 7.207 3 9.243 3 11.092 4.19 12 6c.823-1.758 2.649-3 4.651-3C19.545 3 22 5.507 22 8.432 22 16.24 13.842 21 12 21 10.158 21 2 16.24 2 8.437z"></path></svg>感谢</span>
					</button>
					<button class="item-action">
						<span class="">&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path></svg></span>
					</button>
					</div>
				</div>
				<comments :question_id="item._id" fromType="question" @incrCount="item.cCount++" :cCount="item.cCount" class="comment" 
				v-if="loadComment"></comments>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-7">
	import {periodWrap} from 'common/js/common.js'
	import clsBubble from 'base/cls-bubble.vue'
	import comments from 'base/comments.vue'
	import {userMixin,communicationMixin} from 'common/js/mixin'
	import {mapMutations,mapGetters,mapActions} from 'vuex';
	import axios from 'axios'
	export default {
		mixins: [userMixin],
		props: {
			item: {
				type: Object,
				default: null
			},
			index: {
				type: Number,
				default: 0
			},
			questionList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				base: '../../../../static/avatar/34/',
				loadComment: false
			}
		},
		methods: {
			vote(vote,question_id) {
				axios.post('/vote/question',{
					user_id: this.user._id,
					question_id: question_id,
					vote: vote
				}).then((res)=> {
					if (res.data.status === -1) {
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
					// 每次更新发送重新查询用户赞同数太费资源了
					// communicationMixin.$emit('updateCount')
				})
			},
			more(e) {	
				let rich = $(e.target).siblings('.rich-text')	
				let over = $(e.target).siblings('.overflow-text')	
				if ($(e.target).text()=='阅读全文') {
					periodWrap(rich,over)
					$(e.target).text('收起')
				}else {
					let text = over.children().text()
					over.empty()
					rich.text(text)
					$(e.target).text('阅读全文')
				}
			},
			openComment(e,cCount) {
				this.loadComment = true
				$(e.target).text().trim()=='收起评论'?$(e.target).text(cCount+'条问题评论'):$(e.target).text('收起评论')
				$(e.target).parents('.question').find('.comment').toggle();
			}
		},
		computed: {
			...mapGetters([
				'user',
			])
		},
		components: {
			'cls-bubble': clsBubble,
			comments
		},
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/question.less');
</style>
