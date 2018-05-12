<template>
 	<div id="comment">
		<div class="comment-item">
			<div>
				<div class="item-meta">
					<span class="user-link item-avatar"><div class="Popover">
						<div class="" id=""><a  target="_blank"><img class="user-link-avatar" :src="base+item.user_id.avatar" width="24" height="24"></a></div>
					</div></span>
					<span class="user-link"><a target="_blank">{{item.user_id.username}}</a></span>
					<span class="item-time">{{item.meta.updatedAt}}</span>
					<div></div>
				</div>
				<div class="item-content">{{item.content}}</div>
				<div class="item-footer">
					<button class="link-btn"><svg viewBox="0 0 20 18" width="13" height="16"><title></title><g><path d="M.718 7.024c-.718 0-.718.63-.718.63l.996 9.693c0 .703.718.65.718.65h1.45c.916 0 .847-.65.847-.65V7.793c-.09-.88-.853-.79-.846-.79l-2.446.02zm11.727-.05S13.2 5.396 13.6 2.89C13.765.03 11.55-.6 10.565.53c-1.014 1.232 0 2.056-4.45 5.83C5.336 6.965 5 8.01 5 8.997v6.998c-.016 1.104.49 2 1.99 2h7.586c2.097 0 2.86-1.416 2.86-1.416s2.178-5.402 2.346-5.91c1.047-3.516-1.95-3.704-1.95-3.704l-5.387.007z"></path></g></svg>118</button>
					<button class="hover-btn" @click.stop.prevent="openReply($event)"><svg viewBox="0 0 22 16" width="13" height="16"><title></title><g><path d="M21.96 13.22c-1.687-3.552-5.13-8.062-11.637-8.65-.54-.053-1.376-.436-1.376-1.56V.677c0-.52-.635-.915-1.116-.52L.47 6.67C.18 6.947 0 7.334 0 7.763c0 .376.14.722.37.987 0 0 6.99 6.818 7.442 7.114.453.295 1.136.124 1.135-.5V13c.027-.814.703-1.466 1.532-1.466 1.185-.14 7.596-.077 10.33 2.396 0 0 .395.257.535.257.892 0 .614-.967.614-.967z"></path></g></svg>回复</button>
					<button class="hover-btn"><svg viewBox="0 0 20 18" width="13" height="16"><title></title><g><path d="M.718 7.024c-.718 0-.718.63-.718.63l.996 9.693c0 .703.718.65.718.65h1.45c.916 0 .847-.65.847-.65V7.793c-.09-.88-.853-.79-.846-.79l-2.446.02zm11.727-.05S13.2 5.396 13.6 2.89C13.765.03 11.55-.6 10.565.53c-1.014 1.232 0 2.056-4.45 5.83C5.336 6.965 5 8.01 5 8.997v6.998c-.016 1.104.49 2 1.99 2h7.586c2.097 0 2.86-1.416 2.86-1.416s2.178-5.402 2.346-5.91c1.047-3.516-1.95-3.704-1.95-3.704l-5.387.007z"></path></g></svg>踩</button>
					<button class="hover-btn"><svg viewBox="0 0 18 20" width="11" height="16"><title></title><g><path d="M16.947 1.13c-.633.135-3.927.638-5.697.384-3.133-.45-4.776-2.54-9.95-.888C.305 1.04.025 1.664.025 2.646L0 18.807c0 .3.1.54.304.718.195.202.438.304.73.304.275 0 .52-.102.73-.304.202-.18.304-.418.304-.718v-6.58c4.533-1.235 8.047.668 8.562.864 2.343.893 5.542.008 6.774-.657.397-.178.596-.474.596-.887V1.964c0-.6-.42-.972-1.053-.835z"></path></g></svg>举报</button>
				</div>
				<div class="comment-editor" style="display: none;">
					<div class="editor-top">
						<textarea class="editor-input" v-model="reply_content" :placeholder="'回复'+item.user_id.username"></textarea>
					</div>
					<div class="editor-bottom">
						<button type="button" class="cancel reply_cancel" @click.stop.prevent="closeReply($event)">取消</button>
						<button type="button" class="submit" @click.stop.prevent="reply(item._id)">评论</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-7">
import axios from 'axios'
	export default {
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
			}
		},
		data() {
			return {
				reply_content: '',
				base: '../../static/avatar/34/',
			}
		},
		methods: {
			openReply(e) {
				$(e.target).parents('.comment-item').find('.comment-editor').toggle()
			},
			closeReply(e) {
				$(e.target).parents('.comment-editor').hide()
			},
			reply(comment_id) {
				if (this.reply_content=='') {
					return
				}
			},
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./baseLess/comment.less');
</style>
