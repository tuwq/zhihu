<template>
 	<div id="item">
		<div class="list-item">
			<div class="ContentItem AnswerItem">
				<div class="ContentItem-meta">
					<div class="AuthorInfo">
						<span class="avatar-wrapper">
							<span class="popover"><div><a class="user-link" target="_blank" 
								@click.stop.prevent="toUser(item.anonymousStatus==0?item.user_id:null)">
								<img class="info-avatar" :src="item.anonymousStatus==0?base+item.user_id.avatar:base+'anonymous.jpg'" width="38" height="38">
							</a></div></span>
						</span>
						<div class="info-content">
							<div class="info-header">
								<div class="author-name" @click.stop.prevent="toUser(item.anonymousStatus==0?item.user_id:null)">
									<div class="popover">
										<div><a target="_blank">{{item.anonymousStatus==0?item.user_id.username:'匿名用户'}}</a></div>
									</div>
								</div>
							</div>
							<div class="info-detail" v-if="item.user_id.info">
								<div class="info-badge">
								<div class="badge-text">
								{{item.user_id.info.industry}} ,</div>
								<div class="badge-text">
								{{item.user_id.info.intro}}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="AnswerItem-extraInfo">
						<span class="voters">
							<button class="voterBtn" type="button">{{good}}人赞同了该回答</button>
						</span>
					</div>
				</div>
				<div class="RichContent RichContent--unescapable">
					<div class="richContent-inner">
						<span class="rich-text">
							{{item.content}}
						</span>
						<span class="overflow-text"></span>
					</div>
				<div><div class="item-time"><a target="_blank"><span data-tooltip="发布于 2018-04-09 20:04">编辑于 {{updatedAt}}</span></a></div></div>
				<div class="content-item-actions">
					<span>
						<button :class="{up: true,'is-active': voteStatus==1}" 
						@click.stop.prevent="vote(1,item._id)"><svg viewBox="0 0 20 18" width="9" height="16">
							<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
						</svg>{{good}}</button>
						<button :class="{down: true,'is-active':voteStatus==2}" 
						@click.stop.prevent="vote(2,item._id)"><svg viewBox="0 0 20 18" width="9" height="16">
							<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
						</svg>{{bad}}</button>
						</span>
					<button class="item-action" @click.stop.prevent="openComment(index,$event,item.cCount)">
						<span class=""><!-- &#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z"></path></svg> -->
						{{item.cCount}}条评论</span>
					</button>
					<button class="item-action">
						<span class="">&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2.931 7.89c-1.067.24-1.275 1.669-.318 2.207l5.277 2.908 8.168-4.776c.25-.127.477.198.273.39L9.05 14.66l.927 5.953c.18 1.084 1.593 1.376 2.182.456l9.644-15.242c.584-.892-.212-2.029-1.234-1.796L2.93 7.89z"></path></svg>分享</span>
					</button>
					<button class="item-action">
						<span class="">&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z"></path></svg>收藏</span>
					</button>
					<button class="item-action">
						<span class="">&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2 8.437C2 5.505 4.294 3.094 7.207 3 9.243 3 11.092 4.19 12 6c.823-1.758 2.649-3 4.651-3C19.545 3 22 5.507 22 8.432 22 16.24 13.842 21 12 21 10.158 21 2 16.24 2 8.437z"></path></svg>感谢</span>
					</button>
					<button class="item-action">
						<span class="">&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path></svg></span>
					</button>
					<button class="item-action right-button">
						<span class="open" @click.stop.prevent="scrollText($event)">展开<svg @click.stop.prevent viewBox="0 0 24 24" width="1.2em" height="1.2em" style="transform: rotate(180deg);"><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></svg></span>
						<span class="close" style="display: none;" @click.stop.prevent="scrollText($event)">收起<svg @click.stop.prevent viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></svg></span>
					</button>
				</div>
				</div>
			<comments class="comments" fromType="answer" v-if="loadComment" :cCount="item.cCount" :index="index" :answer_id="item._id" 
			:question_id="question._id">
			</comments>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-7">
import comments from 'base/comments.vue';
import {periodWrap,makeExpandingArea} from 'common/js/common.js';
import {userMixin} from 'common/js/mixin'
import {mapMutations,mapGetters,mapActions} from 'vuex';
import moment from 'moment'  
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
			}
		},
		data() {
			return {
				base: '../../../../static/avatar/38/',
				loadComment: false,
				good: this.item.good,
				bad: this.item.bad,
				updatedAt: moment(this.item.meta.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
				voteStatus: this.item.voteStatus
			}
		},
		methods: {
			vote(vote,answer_id){
				axios.post('/vote/answer',{
					answer_id: answer_id,
					user_id: this.user._id,
					vote: vote
				}).then((res)=> {
					if (res.data.status==-1) {
						// 取消赞踩
						this.voteStatus = 0
						vote==1?this.good--:this.bad--	
					}else if(res.data.status === 0){
						// 新建
						vote==1?this.good++:this.bad++
						vote==1?this.voteStatus=1:this.voteStatus=2
					}else {
						// 改变
						if (vote==1) {
							this.good++
							this.bad--
							this.voteStatus=1
						}else {
							this.bad++
							this.good--
							this.voteStatus=2
						}
						this.good<0?0:this.good
						this.bad<0?0:this.bad
					}
				})
			},
			openComment(i,e,cCount) {
				this.loadComment = true
				$(e.target).text().trim()=='收起评论'?$(e.target).text(cCount+'条评论'):$(e.target).text('收起评论')
				$(e.target).parents('.list-item').find('.comments').toggle()
			},
			scrollText(e) {
				let rich = $(e.target).parents('.list-item').find('.rich-text')
				let over = $(e.target).parents('.list-item').find('.overflow-text')
				if ($(e.target).hasClass('open')) {
					periodWrap(rich,over)	
				}else {
					let text = over.children().text()
					over.empty()
					rich.text(text)
				}
				$(e.target).hide()
				$(e.target).siblings('span').show()
			}
		},
		components: {
			comments
		},
		computed: {
			...mapGetters([
				'question',
				'user'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/answer.less');
</style>
