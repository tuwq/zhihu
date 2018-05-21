<template>
 	<div id="answer-module">
 		<div class="list-header">
 			<h4 class="header-text"><span>我的回答</span></h4>
 			<div class="header-options"><button>按时间排序<span>&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M12 16.183l2.716-2.966a.757.757 0 0 1 1.064.001.738.738 0 0 1 0 1.052l-3.247 3.512a.758.758 0 0 1-1.064 0L8.22 14.27a.738.738 0 0 1 0-1.052.758.758 0 0 1 1.063 0L12 16.183zm0-9.365L9.284 9.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l3.248-3.512a.758.758 0 0 1 1.065 0L15.78 8.73a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063.001L12 6.818z"></path></svg></span></button></div>
 		</div>
 		<div class="answer-box">
 			<div class="answer-inner">
 				<svg viewBox="0 0 150 120" width="150" height="120">
 					<title></title>
 					<g><g fill="none" fill-rule="evenodd">
 						<path fill="#ebeef5" fill-rule="nonzero" d="M67.757 83H45c-1.66 0-3-1.338-3-2.998V37.998A3.003 3.003 0 0 1 45 35h53.42v-3H45c-3.31 0-6 2.686-6 5.998v42.004A5.994 5.994 0 0 0 45 86h21.515l6.853 6.854a2.99 2.99 0 0 0 4.234 0L84.456 86H105c3.31 0 6-2.686 6-5.998v-36.54h-3v36.54A3.003 3.003 0 0 1 105 83H83.214l-7.728 7.728L67.756 83z"></path>
 						<path fill="#ebeef5" d="M55 48.5c0-.828.67-1.5 1.508-1.5h26.984a1.5 1.5 0 1 1 0 3H56.508A1.5 1.5 0 0 1 55 48.5zm0 11c0-.828.677-1.5 1.495-1.5h37.01c.826 0 1.495.666 1.495 1.5 0 .828-.677 1.5-1.495 1.5h-37.01A1.494 1.494 0 0 1 55 59.5zm0 11c0-.828.677-1.5 1.495-1.5h37.01c.826 0 1.495.666 1.495 1.5 0 .828-.677 1.5-1.495 1.5h-37.01A1.494 1.494 0 0 1 55 70.5z"></path>
 						<path fill="#ebeef5" fill-rule="nonzero" d="M94.868 50.46l18.92-18.92-2.83-2.827-18.918 18.92-2.12-2.123 18.917-18.918a3.005 3.005 0 0 1 4.245-.002l2.828 2.828a3.004 3.004 0 0 1-.002 4.245L96.99 52.58l-2.122-2.12zm-7.193 2.377l2.244-7.327 7.07 7.07-7.328 2.245c-1.575.482-2.473-.405-1.988-1.988z"></path>
 					</g></g>
 				</svg>
 				<span>还没有回答，看看<router-link to="/question" target="_blank" style="color: #175199;">为你推荐的问题</router-link></span>
 			</div>
 		</div>
 		<div class="answer-list">
 			<div class="list-item">
 				<div class="ContentItem">
 					<div class="Content-title "><a href="">如何评价「广西精神病医院男护士成香饽饽」？</a></div>
 					<div class="Content-meta">
 						<div class="authorInfo">
 							<span class="avatarLink"><img src="../../../../static/avatar/38/avatar.jpg" width="38" height="38" class="Avatar"></span>
 							<div class="author-content">
 								<div class="authorInfo-head">
 									<a class="user-link">方老师</a>
 								</div>
 								<div class="authorInfo-detail">
 									<div class="authorInfo-badge">
 										<div class="AuthorInfo-badgeText">营养与食品卫生学博士，教授，博导</div> 	
 									</div>
 								</div>
 							</div>
 						</div>
 						<div class="extraInfo">
 							 <div class="Voters">
 							 	<button>6 人赞同了该回答</button>
 							 </div>
 						</div>
 					</div>
 					<div class="RichContent">
 						<div class="RichContent-inner">
 							<span class="RichText">第一次接待来访的美国专家，对方问“where is the bathroom？”，我一脸懵逼，要洗澡？对方赶紧再来一句“toilet”，明白了 后来陆陆续续接待过一些美加澳的专家，基本都喜欢说bathroom，我也从此很从容地直接告诉他们厕所在哪里 想起一个趣事，有一次两个美国专家来我们这讲学，不是待两天那种，是待将近两个</span>
 							<span class="over-text"></span>
 							<button class="ContentItem-more" @click.stop.prevent="readAll($event)">阅读全文</button>
 						</div>
 						<div class="ContentItem-actions">
							<span>
								<button class="up"><svg fill="currentColor" viewBox="0 0 20 18" width="9" height="16">
									<g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
								</svg>15</button>
								<button class="down"><svg fill="currentColor" viewBox="0 0 20 18" width="9" height="16" style="transform: rotate(180deg);">
									<g><path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path></g>
								</svg>15</button>
							</span>
							<button class="ContentItem-action" @click.stop.prevent="openComment($event,item.cCount)">
								<span class="">
								5 条评论</span>
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
 			</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
import {periodWrap} from 'common/js/common.js'
	export default {
		methods: {
			readAll(e) {
				let rich = $(e.target).siblings('.RichText')	
				let over = $(e.target).siblings('.over-text')	
				if ($(e.target).text()=='阅读全文') {
					periodWrap(rich,over)
					$(e.target).text('收起')
				}else {
					let text = over.children().text()
					over.empty()
					rich.text(text)
					$(e.target).text('阅读全文')
				}
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/answer-module.less');
</style>
