<template>
	<div id="">
		<div class="content-list-box">
			<div class="list-header">
				<h4 class="list-header-text">
					<span>我的动态</span>
				</h4>
				<div class=""></div>
			</div>
			<div class="list">
				<div class="list-item">
					<div class="item-meta-box">
						<div class="item meta-inner">
							<span class="meta-title">赞同了回答</span><span>1 个月前</span>
						</div>
					</div>
					<div class="item-answer-box">
						<h2 class="answer-title-box"><div><a href="javascript:void(0)" target="_blank">C# 的前景如何？</a></div></h2>
						<div class="answer-meta-box">
							<div class="header-info-box">
								<span class="avatar-inner"><img class="Avatar" src="../../../common/image/index/user_avatar_people_mini.jpg" width="38" height="38"></span>
								<div class="author-box">
									<div class="author-header"><span class="link-name">匿名用户</span></div>
									<div class="author-detail"></div>
								</div>
							</div>
							<div class="extral-info-box">
								<span class="voter-inner"><button>76 人赞同了该回答</button></span>
							</div>
						</div>
						<div class="answer-content-box">
							<div class="richContent-box">
								<div>
									<span class="content-text">你们这些天天讨论语言的真是无聊的要死。要是找工作的话难道不是什么用的赚钱用什么吗？C#找不到工作你不会换JAVA吗？JAVA找不到换erlang啊！Erlang找不到你换PHP呗！PHP要是都找不到了你去卖水果啊！要是自己干点什么难道不是什么上手快就什么嘛？明明C#一会儿搞定的事情非要写上几千行的配置文件来配JAVA SSH?有病吧！明明有现成的JAVA代码库非要换不熟悉的PHP把坑都走一遍？有病吧。  你们这帮人啊。 naïve！ 等你们到了我这年龄才会知道，什么语言啊都是虚无，虚无，虚无！</span>
									<span class="all-text"></span>
									<button class="getMore" @click.stop.prevent="more">{{overflowStatusText}}<svg v-show="!overflowStatus" viewBox="0 0 10 6" width="10" height="16"><title></title><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg>
									<svg v-show="overflowStatus" viewBox="0 0 10 6" width="10" height="16" style="transform: rotate(180deg);"><title></title><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg>
									</button>
								</div>
							</div>
							<div class="richAction-box">
								<span>
									<button class="voteBtn up is-active"><svg viewBox="0 0 20 18" width="9" height="16">
										<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
									</svg>7</button>
									<button class="voteBtn down"><svg viewBox="0 0 20 18" width="9" height="16">
										<title></title><g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
									</svg></button>
								</span>
								<button v-show="!commentsStatus" class="action-item" @click.stop.prevent="switchCommentsStatus"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z"></path></svg></span>32 条评论</button>
								<button v-show="commentsStatus" class="action-item" @click.stop.prevent="switchCommentsStatus"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z"></path></svg></span>收起评论</button>
								<button class="action-item"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2.931 7.89c-1.067.24-1.275 1.669-.318 2.207l5.277 2.908 8.168-4.776c.25-.127.477.198.273.39L9.05 14.66l.927 5.953c.18 1.084 1.593 1.376 2.182.456l9.644-15.242c.584-.892-.212-2.029-1.234-1.796L2.93 7.89z"></path></svg></span>分享</button>
								<button class="action-item"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z"></path></svg></span>收藏</button>
								<button class="action-item"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2 8.437C2 5.505 4.294 3.094 7.207 3 9.243 3 11.092 4.19 12 6c.823-1.758 2.649-3 4.651-3C19.545 3 22 5.507 22 8.432 22 16.24 13.842 21 12 21 10.158 21 2 16.24 2 8.437z"></path></svg></span>感谢</button>
								<button class="action-item"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path></svg></span></button>
							</div>
						</div>
					</div>
					<comments v-show="commentsStatus"></comments>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import comments from 'base/comments.vue';
import {periodWrap} from 'common/js/common.js';
 	export default {
		components: {
			'comments': comments
		},
		data(){
			return {
				overflowStatus: false,
				commentsStatus: false
			}	
		},
		methods: {
			more() {
				if(!this.overflowStatus) {
					periodWrap($('.content-text'),$('.all-text'));
				}else{
					var text = $('.all-text').children().text();
					$('.content-text').text(text);
					$('.all-text').empty();
				}
				this.overflowStatus = !this.overflowStatus;	
			},
			switchCommentsStatus() {
				this.commentsStatus = !this.commentsStatus;
			}
		},
		computed: {
			overflowStatusText() {
				return this.overflowStatus?'收起':'阅读全文'
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/content-list.less');
</style>
