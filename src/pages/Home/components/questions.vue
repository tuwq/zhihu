<template>
 	<div class="questions">
 		<div class="question Card">
 			<cls-bubble></cls-bubble>
 			<div class="question-inner">
 				<div class="header">
 					<div class="oneLine">来自话题: <span><a target="_blank">编程</a></span></div>
 					<div class="twoLine">
 						<span class="user-avatar"><div class="Popover"><a class="user-avatar-link">
 							<img class="avatar-img" width="24" height="24" src="../../../common/image/index/user_avatar_index_questions.jpg">
 						</a></div></span>
 						<div class="user-signature">
 							<div class="name"><span class="info-name"><a>codingXiaxw ,</a></span></div>
 							<div class="detail"><div class="info-badge"><div class="text">程序员</div></div></div>
 						</div>
 					</div>
 				</div>
 				<div class="footer">
 					<h2 class="title">
 						<div>
 							<a target="_blank" @click.stop.prevent="toDetail(1110)">中国的程序员是否过多了?</a>
 						</div>
 					</h2>
 					<div class="line"></div>
 					<div class="content">
 						<div class="content-inner">
 							<span class="content-text">几个月前为了让志同道合的程序员们有一个交流的平台，于是创建了一个叫做“Java学习交流群”的qq群，我以为同行没那么多应该没多少人加入进来，然而截止到今天已经进来了快1800余人：</span>
 							<span class="overflow-text"></span>
 							<button class="content-more" @click.stop.prevent="more">{{commentsStausScroll}}<svg viewBox="0 0 10 6" width="10" height="16" v-show="!overflowStatus"><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg>
							<svg v-show="overflowStatus" viewBox="0 0 10 6" width="10" height="16" style="transform: rotate(180deg);"><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg>
 							</button>
 						</div>
 						<div class="content-actions">
 							<span>
								<button class="up"><svg viewBox="0 0 20 18" width="9" height="16">
									<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
								</svg>73</button>
								<button class="down"><svg viewBox="0 0 20 18" width="9" height="16">
									<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
								</svg>73</button>
 							</span>
 							<button class="item-action" @click.stop.prevent="switchCommentStatus">
								<span class="">&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z"></path></svg>
								53条 评论</span>
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
 					<comments v-show="CommentStatus"></comments>
 				</div>
 			</div>
 		</div>
 		
 	</div>
</template>

<script type="text/ecmascript-6">
	import clsBubble from 'base/cls-bubble.vue';
	import comments from 'base/comments.vue';
	import {periodWrap} from 'common/js/common.js';
	export default {
		data() {
			return {
				CommentStatus: false,
				overflowStatus: false
			}
		},
		components: {
			'cls-bubble': clsBubble,
			comments
		},
		methods: {
			toDetail(id) {
				this.$router.push({ path: `/question/${id}` }) 
			},
			more() {
				if(!this.overflowStatus) {
					periodWrap($('.content-text'),$('.overflow-text'));
				}else{
					var text = $('.overflow-text').children().text();
					$('.content-text').text(text);
					$('.overflow-text').empty();
				}
				this.overflowStatus = !this.overflowStatus;
				
			},
			switchCommentStatus() {
				this.CommentStatus = !this.CommentStatus;
			}
		},
		computed: {
			commentsStausScroll() {
				return this.overflowStatus?'收起全文':'阅读全文'
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/questions.less');
</style>
