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
				
			
				<answerItem></answerItem>
				<questionItem></questionItem>
				<!--  动态列表数据模板不一致
					// 动态类型
					// 1:问题相关 2:回答相关	3:评论相关
					// 动作类型
					// 1:提出	2:关注	3:点赞
					回答了问题(2,1)和赞同回答(2,3)相同
					添加了问题(1,1)和关注问题(1,2)和赞同问题(1,3)相同
					 -->
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import comments from 'base/comments.vue'
import {periodWrap} from 'common/js/common.js'
import answerItem from 'base/answerItem.vue'
import questionItem from 'base/questionItem.vue'
import axios from 'axios'
 	export default {
		components: {
			'comments': comments,
			answerItem,
			questionItem
		},
		data(){
			return {
				overflowStatus: false,
				commentsStatus: false,
				dynamicList: []
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
			},
			init(){
				axios.post('/dynamic/readSend',{
					detail_id: this.detail_user_id
				}).then((res)=>{
					this.dynamicList = res.data.result.dynamics
					console.log(this.dynamicList)
				})
			}
		},
		created() {
			this.init()
		},
		computed: {
			detail_user_id() {
				return this.$route.params.user_url
			},
			overflowStatusText() {
				return this.overflowStatus?'收起':'阅读全文'
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/dynamic-list.less');
</style>
