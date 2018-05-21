<template>
 	<div id="answer-module">
 		<div class="list-header">
 			<h4 class="header-text" v-if="uInfo.info"><span>
 			{{user._id==detail_user_id?'我':uInfo.info.gender==0?'他':uInfo.info.gender==1?'他':'她'}}的回答</span></h4>
 			<div class="header-options"><button>按时间排序<span>&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M12 16.183l2.716-2.966a.757.757 0 0 1 1.064.001.738.738 0 0 1 0 1.052l-3.247 3.512a.758.758 0 0 1-1.064 0L8.22 14.27a.738.738 0 0 1 0-1.052.758.758 0 0 1 1.063 0L12 16.183zm0-9.365L9.284 9.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l3.248-3.512a.758.758 0 0 1 1.065 0L15.78 8.73a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063.001L12 6.818z"></path></svg></span></button></div>
 		</div>
 		<div class="answer-box" v-show="!answers">
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
 			<answer-people v-for="(item,index) in answers" :uInfo="uInfo" :item="item" :index="index" :key="item._id"></answer-people>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
import {periodWrap,mergeData} from 'common/js/common.js'
import {mapMutations,mapGetters} from 'vuex';
import answerPeople from 'p_components/answer_people.vue'
import comments from 'base/comments.vue'
import axios from 'axios'
	export default {
		data() {
			return {
				uInfo: {
					info: {}
				},
				answers: [],
				loadComment: false
			}
		},
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
			},
			init() {
				axios.post('/user/read/answer',{
					detail_id: this.detail_user_id
				}).then((res)=> {
					this.answers = mergeData(res.data.result.answers,res.data.result.infos)
					this.uInfo = res.data.result.user
				})
			},
			openComment(e,index) {
				this.loadComment = true
				$(e.target).text().trim()=='收起评论'?$(e.target).text(cCount+'条评论'):$(e.target).text('收起评论')
				$('.comments').toggle()
			},
		},
		created() {
			this.init()
		},
		computed: {
			...mapGetters([
				'user',
				'detail_user_id'
			])
		},
		components: {
			comments,
			answerPeople
		},
		watch: {
			detail_user_id (newval,oldval) {
				if ( newval != oldval && newval != undefined ) {
					this.init()
				}
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/answer-module.less');
</style>
