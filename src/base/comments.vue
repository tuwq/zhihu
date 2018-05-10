<template>
 	<div class="comments-container">
 		<div class="comments-inner">
 			<div class="top-bar">
 				<div class="top-title"><h2 class="title">65 条评论</h2></div>
 				<div class="top-options"><button class="sortBtn"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M13.004 7V4.232c0-.405.35-.733.781-.733.183 0 .36.06.501.17l6.437 5.033c.331.26.376.722.1 1.033a.803.803 0 0 1-.601.264H2.75a.75.75 0 0 1-.75-.75V7.75A.75.75 0 0 1 2.75 7h10.254zm-1.997 9.999v2.768c0 .405-.35.733-.782.733a.814.814 0 0 1-.5-.17l-6.437-5.034a.702.702 0 0 1-.1-1.032.803.803 0 0 1 .6-.264H21.25a.75.75 0 0 1 .75.75v1.499a.75.75 0 0 1-.75.75H11.007z"></path></svg></span>切换为时间排序</button></div>
 			</div>
 			<div>
 				<div class="comment-list">
 					<div class="comment-item">
 						<div>
 							<div class="item-meta">
 								<span class="user-link item-avatar"><div class="Popover">
 									<div class="" id=""><a data-user="" target="_blank"><img class="user-link-avatar" src="../../static/avatar/34/avatar.png" width="24" height="24" alt="如此耕耘"></a></div>
 								</div></span>
 								<span class="user-link"><a target="_blank">如此耕耘</a></span>
 								<span class="item-time">1 个月前</span>
 								<div></div>
 							</div>
 							<div class="item-content">人脑，生存期不间断运作，海量线程，呼吸，温控，血压，CPU核心驱动，皮肤感知，肢体平衡，视觉，许许多多必须的线程，还有运动模式，休眠模式，考试模式，工作模式，约会模式，电影模式，吃饭模式，许许多多后台模式的精准调控，特征是无法感知的自动自觉，是人类祖先用生命换来的最优化，700万年的进化换来的快，换来的人心如宇宙。</div>
 							<div class="item-footer" v-show="!openStatus">
 								<button class="link-btn"><svg viewBox="0 0 20 18" width="13" height="16"><title></title><g><path d="M.718 7.024c-.718 0-.718.63-.718.63l.996 9.693c0 .703.718.65.718.65h1.45c.916 0 .847-.65.847-.65V7.793c-.09-.88-.853-.79-.846-.79l-2.446.02zm11.727-.05S13.2 5.396 13.6 2.89C13.765.03 11.55-.6 10.565.53c-1.014 1.232 0 2.056-4.45 5.83C5.336 6.965 5 8.01 5 8.997v6.998c-.016 1.104.49 2 1.99 2h7.586c2.097 0 2.86-1.416 2.86-1.416s2.178-5.402 2.346-5.91c1.047-3.516-1.95-3.704-1.95-3.704l-5.387.007z"></path></g></svg>118</button>
 								<button class="hover-btn" @click.stop.prevent="openComment"><svg viewBox="0 0 22 16" width="13" height="16"><title></title><g><path d="M21.96 13.22c-1.687-3.552-5.13-8.062-11.637-8.65-.54-.053-1.376-.436-1.376-1.56V.677c0-.52-.635-.915-1.116-.52L.47 6.67C.18 6.947 0 7.334 0 7.763c0 .376.14.722.37.987 0 0 6.99 6.818 7.442 7.114.453.295 1.136.124 1.135-.5V13c.027-.814.703-1.466 1.532-1.466 1.185-.14 7.596-.077 10.33 2.396 0 0 .395.257.535.257.892 0 .614-.967.614-.967z"></path></g></svg>回复</button>
 								<button class="hover-btn"><svg viewBox="0 0 20 18" width="13" height="16"><title></title><g><path d="M.718 7.024c-.718 0-.718.63-.718.63l.996 9.693c0 .703.718.65.718.65h1.45c.916 0 .847-.65.847-.65V7.793c-.09-.88-.853-.79-.846-.79l-2.446.02zm11.727-.05S13.2 5.396 13.6 2.89C13.765.03 11.55-.6 10.565.53c-1.014 1.232 0 2.056-4.45 5.83C5.336 6.965 5 8.01 5 8.997v6.998c-.016 1.104.49 2 1.99 2h7.586c2.097 0 2.86-1.416 2.86-1.416s2.178-5.402 2.346-5.91c1.047-3.516-1.95-3.704-1.95-3.704l-5.387.007z"></path></g></svg>踩</button>
 								<button class="hover-btn"><svg viewBox="0 0 18 20" width="11" height="16"><title></title><g><path d="M16.947 1.13c-.633.135-3.927.638-5.697.384-3.133-.45-4.776-2.54-9.95-.888C.305 1.04.025 1.664.025 2.646L0 18.807c0 .3.1.54.304.718.195.202.438.304.73.304.275 0 .52-.102.73-.304.202-.18.304-.418.304-.718v-6.58c4.533-1.235 8.047.668 8.562.864 2.343.893 5.542.008 6.774-.657.397-.178.596-.474.596-.887V1.964c0-.6-.42-.972-1.053-.835z"></path></g></svg>举报</button>
 							</div>
 							<div class="comment-editor" v-show="openStatus">
 								<div class="editor-top">
 									<textarea class="editor-input" v-model="comment_text" id="editInput" placeholder="回复如此耕耘"></textarea>
 								</div>
 								<div class="editor-bottom">
 									<button type="button" class="cancel" @click.stop.prevent="clsComment">取消</button>
 									<button type="button" class="submit" disabled>评论</button>
 								</div>
 							</div>
 						</div>
 					</div>
 					<div class="comment-list-divider">
 						<div class="line"></div>
 						<div class="text">以上为精选评论<svg viewBox="0 0 20 20" width="14" height="16"><title></title>
 							<g><path d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zm0-3.68c-.328 0-.61-.116-.846-.345-.236-.23-.354-.515-.354-.856 0-.33.118-.612.354-.848.236-.235.518-.353.846-.353.328 0 .61.114.846.343.236.23.354.515.354.856 0 .34-.118.625-.354.855-.236.23-.518.344-.846.344zm2.76-7.4c-.227.233-.636.622-1.226 1.17-.163.155-.295.29-.393.408-.097.117-.17.224-.218.32-.048.098-.086.195-.112.293-.026.098-.066.268-.12.513-.09.518-.376.777-.856.777-.25 0-.46-.085-.63-.254-.17-.17-.255-.42-.255-.755 0-.418.06-.78.186-1.086.125-.307.29-.576.497-.808.206-.23.485-.506.835-.825.307-.28.53-.49.666-.63.137-.143.252-.3.346-.475.093-.175.14-.364.14-.568 0-.4-.143-.735-.428-1.01-.286-.273-.655-.41-1.106-.41-.528 0-.917.138-1.166.414-.25.278-.46.685-.634 1.223-.163.563-.472.845-.928.845-.27 0-.496-.1-.68-.295-.185-.197-.278-.41-.278-.64 0-.473.147-.952.44-1.438.292-.486.72-.888 1.28-1.207C8.683 4.158 9.34 4 10.087 4c.696 0 1.31.133 1.844.4.532.266.944.63 1.234 1.087.29.46.436.957.436 1.495 0 .423-.083.794-.248 1.113-.166.32-.363.594-.59.826z"></path></g></svg></div>
 					</div>
 				</div>
 				<div class="pagination"></div>
 				<span></span>
 			</div>
			<div class="bottom-bar"></div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
import {makeExpandingArea} from 'common/js/common.js';
	export default {
		data() {
			return {
				comment_text: '',
				openStatus: false
			}
		},
		methods: {
			openComment() {
				this.openStatus = true
			},
			clsComment() {
				this.openStatus = false
			}
		},
		mounted() {
			makeExpandingArea(document.getElementById('editInput'));
		},
		watch: {
			comment_text(newval,oldval){
				newval.length>0?$('.submit').attr('disabled',false):$('.submit').attr('disabled',true)
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./baseLess/comments.less');
</style>
