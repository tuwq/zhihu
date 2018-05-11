<template>
 	<div class="question-wrapper">
 		<div class="card">
 			<div class="list">
 				<div class="list-header">
 					<h4 class="list-headerText"><span>{{sum}}个回答</span></h4>
 					<div class="list-headerOptions">
 						<div class="popover">
 							<button class="Sorting">默认排序<span>&#8203;<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 16.183l2.716-2.966a.757.757 0 0 1 1.064.001.738.738 0 0 1 0 1.052l-3.247 3.512a.758.758 0 0 1-1.064 0L8.22 14.27a.738.738 0 0 1 0-1.052.758.758 0 0 1 1.063 0L12 16.183zm0-9.365L9.284 9.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l3.248-3.512a.758.758 0 0 1 1.065 0L15.78 8.73a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063.001L12 6.818z"></path></svg></span></button>
 						</div>
 					</div>
 				</div>
 				<div>
 					<div class="">
 						<div class="list-item" v-for="(item,index) in answers" :key="item._id">
 							<div class="ContentItem AnswerItem">
 								<div class="ContentItem-meta">
 									<div class="AuthorInfo">
 										<span class="avatar-wrapper">
 											<span class="popover"><div><a class="user-link" target="_blank">
 												<img class="info-avatar" :src="item.anonymousStatus==0?base+item.user_id.avatar:base+'anonymous.jpg'" width="38" height="38">
 											</a></div></span>
 										</span>
 										<div class="info-content">
 											<div class="info-header">
 												<div class="author-name">
 													<div class="popover">
 														<div><a target="_blank">{{item.anonymousStatus==0?item.user_id.username:'匿名用户'}}</a></div>
 													</div>
 												</div>
 											</div>
 											<div class="info-detail" v-if="item.user_id.info">
 												<div class="info-badge"><div class="badge-text">
 												{{item.user_id.info.intro}}</div>
 												<div class="badge-text">
 												{{item.user_id.info.industry}}</div>
 												</div>
 											</div>
 										</div>
 									</div>
 									<div class="AnswerItem-extraInfo">
 										<span class="voters">
 											<button class="voterBtn" type="button">291 人赞同了该回答</button>
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
									<div><div class="item-time"><a target="_blank"><span data-tooltip="发布于 2018-04-09 20:04">编辑于 {{item.meta.createdAt}}</span></a></div></div>
									<div class="content-item-actions">
										<span>
											<button class="up"><svg viewBox="0 0 20 18" width="9" height="16">
												<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
											</svg>73</button>
											<button class="down"><svg viewBox="0 0 20 18" width="9" height="16">
												<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
											</svg>73</button>
			 							</span>
										<button class="item-action" @click.stop.prevent="openComment(index,$event)">
											<span class="">&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z"></path></svg>
											22条评论</span>
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
											<span class="" @click.stop.prevent="scrollText($event,index)">展开<svg @click.stop.prevent viewBox="0 0 24 24" width="1.2em" height="1.2em" style="transform: rotate(180deg);"><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></svg></span>
											<span class="" v-show="false" @click.stop.prevent="scrollText($event,index)">收起<svg @click.stop.prevent viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></svg></span>
										</button>
									</div>
 								</div>
								<comments class="Opencomment" style="display: none;" :index="index" :answer_id="item._id"></comments>
 							</div>
 						</div>	
 					</div>
 				</div>
 			</div>
 		</div>
 		<div style="text-align: center;" v-show="no_more_data"><h1>没有更多数据了</h1></div>
 	</div>
</template>

<script type="text/ecmascript-6">
import {periodWrap,makeExpandingArea} from 'common/js/common.js';
import comments from 'base/comments.vue';
import {mapMutations,mapGetters} from 'vuex';
import axios from 'axios'
	export default {
		props: {
			sum: {
				type: Number,
				default: 0
			},
			no_more_data: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				base: '../../../../static/avatar/38/',
			}
		},
		methods: {
			openComment(i,e) {
				$('.Opencomment').each((index,item)=> {
					if (i===index) { 
						let me = $(item)
						$(e.target).text().trim()=='收起评论'?$(e.target).text('22条评论'):$(e.target).text('收起评论')
						me.toggle()
					} 
				})
			},
			scrollText(e,index) {
				let span = $(e.target)
				$('.overflow-text').each((i,item)=> {
					if (index === i) {
						let me = $(item)
						let rich = me.siblings('.rich-text')
						if (span.text()=='展开') {
							periodWrap(rich,me)	
						}else{	
							let text = me.children().text()
							me.empty();
							rich.text(text)
						}
						span.hide()
						span.siblings('span').show(); 
					}
				})

			}
		},
		components: {
			comments
		},
		computed: {
			...mapGetters([
				'question',
				'answers'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/question-list.less');
</style>
