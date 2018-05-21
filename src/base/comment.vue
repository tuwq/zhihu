<template>
 	<div id="comment">
		<div class="comment-item">
			<div>
				<div class="item-meta">
					<span class="user-link item-avatar" 
					@click.stop.prevent="toUser(item.user_id)"><div class="Popover">
						<div class="" id=""><a  target="_blank"><img class="user-link-avatar" :src="base+item.user_id.avatar" width="24" height="24"></a></div>
					</div></span>
					<span class="user-link" 
					@click.stop.prevent="toUser(item.user_id)"><a target="_blank">{{!item.to?item.user_id.username:item.user_id.username+'	回复	'+item.to.user_id.username}}</a></span>
					<span class="item-time">{{updatedAt}}</span>
					<div></div>
				</div>
				<div class="item-content">{{item.content}}</div>
				<div class="item-footer">
					<button :class="{'link-btn': true,'is-active': item.voteStatus==1}" 
					@click.stop.prevent="vote(1,item._id)"><svg viewBox="0 0 20 18" width="13" height="16"><title></title><g><path d="M.718 7.024c-.718 0-.718.63-.718.63l.996 9.693c0 .703.718.65.718.65h1.45c.916 0 .847-.65.847-.65V7.793c-.09-.88-.853-.79-.846-.79l-2.446.02zm11.727-.05S13.2 5.396 13.6 2.89C13.765.03 11.55-.6 10.565.53c-1.014 1.232 0 2.056-4.45 5.83C5.336 6.965 5 8.01 5 8.997v6.998c-.016 1.104.49 2 1.99 2h7.586c2.097 0 2.86-1.416 2.86-1.416s2.178-5.402 2.346-5.91c1.047-3.516-1.95-3.704-1.95-3.704l-5.387.007z"></path></g></svg>{{item.good}}</button>
					<button 
					@click.stop.prevent="openConversation(item._id)" class="link-btn" style="margin-left: 8px;" v-show="item.to"><svg viewBox="0 0 20 20" width="13" height="16"><title></title><g><g>
						<path d="M9 0C3.394 0 0 4.13 0 8c0 1.654.522 3.763 2.014 5.566.314.292.518.82.454 1.17-.165 1.488-.842 1.905-.842 1.905-.328.332.105.67.588.582 1.112-.2 2.07-.58 3.526-1.122.4-.202.464-.147.78-.078C11.524 17.764 18 14 18 8c0-3.665-3.43-8-9-8z"></path><path d="M19.14 9.628c.758.988.86 2.01.86 3.15 0 1.195-.62 3.11-1.368 3.938-.21.23-.354.467-.308.722.12 1.073.614 1.5.614 1.5.237.24-.188.563-.537.5-.802-.145-1.494-.42-2.545-.81-.29-.146-.336-.106-.563-.057-2.043.712-4.398.476-6.083-.926 5.964-.524 8.726-3.03 9.93-8.016z"></path>
					</g></g></svg>查看对话</button>
					<button class="hover-btn" @click.stop.prevent="openReply($event)"><svg viewBox="0 0 22 16" width="13" height="16"><title></title><g><path d="M21.96 13.22c-1.687-3.552-5.13-8.062-11.637-8.65-.54-.053-1.376-.436-1.376-1.56V.677c0-.52-.635-.915-1.116-.52L.47 6.67C.18 6.947 0 7.334 0 7.763c0 .376.14.722.37.987 0 0 6.99 6.818 7.442 7.114.453.295 1.136.124 1.135-.5V13c.027-.814.703-1.466 1.532-1.466 1.185-.14 7.596-.077 10.33 2.396 0 0 .395.257.535.257.892 0 .614-.967.614-.967z"></path></g></svg>回复</button>
					<button class='hover-btn' 
					@click.stop.prevent="vote(2,item._id)"><svg viewBox="0 0 20 18" width="13" height="16" style="transform: rotate(180deg);"><title></title><g><path d="M.718 7.024c-.718 0-.718.63-.718.63l.996 9.693c0 .703.718.65.718.65h1.45c.916 0 .847-.65.847-.65V7.793c-.09-.88-.853-.79-.846-.79l-2.446.02zm11.727-.05S13.2 5.396 13.6 2.89C13.765.03 11.55-.6 10.565.53c-1.014 1.232 0 2.056-4.45 5.83C5.336 6.965 5 8.01 5 8.997v6.998c-.016 1.104.49 2 1.99 2h7.586c2.097 0 2.86-1.416 2.86-1.416s2.178-5.402 2.346-5.91c1.047-3.516-1.95-3.704-1.95-3.704l-5.387.007z"></path></g></svg>{{item.voteStatus==2?'取消踩':''}}</button>
					<button class="hover-btn"><svg viewBox="0 0 18 20" width="11" height="16"><title></title><g><path d="M16.947 1.13c-.633.135-3.927.638-5.697.384-3.133-.45-4.776-2.54-9.95-.888C.305 1.04.025 1.664.025 2.646L0 18.807c0 .3.1.54.304.718.195.202.438.304.73.304.275 0 .52-.102.73-.304.202-.18.304-.418.304-.718v-6.58c4.533-1.235 8.047.668 8.562.864 2.343.893 5.542.008 6.774-.657.397-.178.596-.474.596-.887V1.964c0-.6-.42-.972-1.053-.835z"></path></g></svg>举报</button>
				</div>
				<div class="comment-editor" style="display: none;">
					<div class="editor-top">
						<textarea class="editor-input" v-model="reply_content" :placeholder="'回复'+item.user_id.username" ref="editor_input"></textarea>
					</div>
					<div class="editor-bottom">
						<button type="button" class="cancel reply_cancel" @click.stop.prevent="closeReply($event)">取消</button>
						<button type="button" class="submit" @click.stop.prevent="reply(item._id,$event)">评论</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-7">
import axios from 'axios'
import {communicationMixin,userMixin} from 'common/js/mixin'
import {makeExpandingArea} from 'common/js/common.js';
import moment from 'moment' 
import {mapMutations,mapGetters} from 'vuex';
	export default {
		mixins: [communicationMixin,userMixin],
		props: {
			item: {
				type: Object,
				default: null
			},
			index: {
				type: Number,
				default: 0
			},
			answer_id: {
				type: String,
				default: ''
			},
			question_id: {
				type: String,
				default: ''
			},
			count: {
				type: Number,
				default: 0
			},
			fromType: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				reply_content: '',
				base: '../../static/avatar/34/',
				updatedAt: moment(this.item.meta.updatedAt).format('YYYY-MM-DD HH:mm:ss')
			}
		},
		methods: {
			openReply(e) {
				$(e.target).parents('.comment-item').find('.comment-editor').toggle()
			},
			closeReply(e) {
				$(e.target).parents('.comment-editor').hide()
			},
			vote(vote,comment_id) {
				axios.post('/vote/comment',{
					user_id: this.user._id,
					comment_id: comment_id,
					vote: vote
				}).then((res)=> {
					if (res.data.status === -1) {
						// 取消赞踩
						vote==1?this.item.good--:this.item.bad--
						this.item.voteStatus = 0
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
			reply(comment_id,e) {
				if (this.reply_content=='') {
					return
				}
				if (this.fromType == 'question') {
					axios.post('/comment/insert/question',{
						content: this.reply_content,
						question_id: this.question_id,
						user_id: this.user._id,
						to: comment_id
					}).then((res) => {
						if (res.data.status) {
							return alert(res.data.result.msg)
						}
						this.reply_content = ''
						this.$emit('replyOver')
						this.closeReply(e)
					})	
				}else {
					axios.post('/comment/insert',{
						content: this.reply_content,
						question_id: this.question._id,
						answer_id: this.answer_id,
						user_id: this.user._id,
						to: comment_id
					}).then((res) => {
						if (res.data.status) {
							return alert(res.data.result.msg)
						}
						this.reply_content = ''
						this.$emit('replyOver')
						this.closeReply(e)
					})		
				}
			},
			openConversation(comment_id) {
				communicationMixin.$emit('openConversation',comment_id)
			}
		},
		mounted() {
			makeExpandingArea(this.$refs.editor_input)
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
  @import url('./baseLess/comment.less');
</style>
