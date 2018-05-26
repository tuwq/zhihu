<template>
 	<div class="comments-container">
 		<div class="comments-inner">
			<loading v-show="loading"></loading>
 			<div class="top-bar">
 				<div class="top-title"><h2 class="title">{{commentSum}} 条评论</h2></div>
 				<div class="top-options"><button class="sortBtn"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M13.004 7V4.232c0-.405.35-.733.781-.733.183 0 .36.06.501.17l6.437 5.033c.331.26.376.722.1 1.033a.803.803 0 0 1-.601.264H2.75a.75.75 0 0 1-.75-.75V7.75A.75.75 0 0 1 2.75 7h10.254zm-1.997 9.999v2.768c0 .405-.35.733-.782.733a.814.814 0 0 1-.5-.17l-6.437-5.034a.702.702 0 0 1-.1-1.032.803.803 0 0 1 .6-.264H21.25a.75.75 0 0 1 .75.75v1.499a.75.75 0 0 1-.75.75H11.007z"></path></svg></span>切换为时间排序</button></div>
 			</div>
 			<div>
 				<div class="comment-list" v-if="commentList">
 					<comment 
 					v-for="(item,index) in commentList" 
 					:fromType="fromType"
 					@replyOver="replyOver"
 					:item="item" 
 					:index="index" 
 					:key="item._id" 
 					:answer_id="answer_id" 
 					:question_id="question_id"></comment>
 				</div>
 				<div class="pagination" v-show="pageSum>1" ref="pagin">
 					<button class="pageButton" v-show="page!=1" @click.stop.prevent="getCommentList(page-1)">上一页</button>
					<div style="display: inline-block;">
						<!--少于 4 页 1 2 3 4-->
						<div v-if="pageSum<=4" style="display: inline-block;" class="mod">
							<button @click.stop.prevent="getCommentList(item)" class="pageButton" v-for="item in pageSum" type="button" ref="btn">{{item}}</button>
						</div>

						<div v-else style="display: inline-block;" class="mod">
							<!--三种情况 1-->
							<!-- 1 2 3 4 ... 17 -->
							<div v-if="page<4" class="p1">
								<button  @click.stop.prevent="getCommentList(item)" class="pageButton" v-for="item in [1,2,3,4]" type="button" ref="btn">{{item}}
							 	</button>
								<span class="PaginationButton">...</span>
								<button  @click.stop.prevent="getCommentList(pageSum)" class="pageButton" type="button">{{pageSum}}</button>
							</div>
							<!-- 1 ... 3 4 5 ... 17 --> 
							<!-- 1.... 13 14 15 ... 17-->
							<div v-else-if="page>=4 && page<=pageSum-3" class="p2">
								<button @click.stop.prevent="getCommentList(1)" class="pageButton" type="button">1</button>
								<span class="PaginationButton">...</span>
								<button  @click.stop.prevent="getCommentList(item)" class="pageButton" v-for="item in [page-1,page,page+1]" type="button" ref="btn">{{item}}
							 	</button>
								<span class="PaginationButton">...</span>
							 	<button  @click.stop.prevent="getCommentList(pageSum)" class="pageButton" type="button">{{pageSum}}</button>
							</div>
							<!-- 1 ... 14 15 16 17-->
							<div v-else class="p3">
								<button @click.stop.prevent="getCommentList(1)" class="pageButton" type="button">1</button>
								<span class="PaginationButton">...</span>
								<button  @click.stop.prevent="getCommentList(item)" class="pageButton" v-for="item in [pageSum-3,pageSum-2,pageSum-1,pageSum]" type="button" ref="btn">{{item}}
							 	</button>
							</div>							
						</div>	
					</div>
 					<!--超过四页时显示省略号和最后一页-->
 					<button @click.stop.prevent="getCommentList(page+1)" class="pageButton" v-show="page!=pageSum">下一页</button>
 				</div>
 				<div class="comment-footer">
 					<div class="comment-input-wrapper">
 						<div class="comment-input-inner">
 							<textarea class="comment-input" v-model="content" placeholder="写下你的评论..." ref="comment_input"></textarea>
 						</div>
 					</div>
 					<button class="comment-btn" @click.stop.prevent="submit">评论</button>
 				</div>
 				<span></span>
 			</div>
			<div class="bottom-bar"></div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
import {makeExpandingArea,mergeData} from 'common/js/common.js';
import {mapMutations,mapGetters,mapActions} from 'vuex';
import {communicationMixin} from 'common/js/mixin'
import comment from 'base/comment.vue'
import loading from 'base/loading.vue'
import axios from 'axios'
	export default {
		props: {
			commentSum: {
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
			fromType: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				comment_text: '',
				content: '',
				commentList: [],
				limit: 5,
				pageSum: '',
				page: 1,
				loading: true
			}
		},
		methods: {
			submit() {
				// 回复后
				if (this.content=='') {
					return
				}
				if ( this.fromType  == 'question' ) {
					axios.post('/comment/insert/question',{
						content: this.content,
						question_id: this.question_id,
						user_id: this.user._id,
					}).then((res)=> {
						this.content = ''
						this.getCommentList(1)
						this.$emit('incrQuestionCommentSum')
					})	
				}else {
					axios.post('/comment/insert',{
						content: this.content,
						question_id: this.question_id,
						answer_id: this.answer_id,
						user_id: this.user._id,
					}).then((res)=> {
						this.content = ''
						this.getCommentList(1)
						this.$emit('incrAnswerCommentSum')
					})					
				}
			},
			getCommentList(page) {
				this.page = page
				if(this.fromType == 'answer') {
					axios.post('/comment/read',{
						answer_id: this.answer_id,
						limit: this.limit,
						page: page
					}).then((res)=> {
						// 需要总页数计算页码
						this.loading = false
						let data = mergeData(res.data.result.comments,res.data.result.infos)
						this.commentList = data
						this.pageSum = Math.ceil(this.commentSum/this.limit)
						this.currentClass(page)
					})
				} else if ( this.fromType  == 'question' ) {
					axios.post('/comment/read/question',{
						question_id: this.question_id,
						limit: this.limit,
						page: page
					}).then((res)=> {
						// 需要总页数计算页码
						this.loading = false
						let data = mergeData(res.data.result.comments,res.data.result.infos)
						this.commentList = data
						this.pageSum = Math.ceil(this.commentSum/this.limit)
						this.currentClass(page)	
					})
				}
			},
			currentClass(page) {
				// 上或下页的操作	
				this.$nextTick().then(()=> {
					$(this.$refs.pagin).find('.pageButton').each((index,item)=> {
						if( page == $(item).text()) {
							$(item).addClass('current').siblings('.pageButton').removeClass('current')
						}
					})
				})	
			},
			replyOver() {
				// 回复后
				if (this.fromType == 'question') {
					this.$emit('incrQuestionCommentSum')
				}else {
					this.$emit('incrAnswerCommentSum')
				}
				this.getCommentList(1)
			}
		},
		mounted() {
			makeExpandingArea(this.$refs.comment_input)
		},
		components: {
			comment,
			loading
		},
		created() {
			this.getCommentList(1)
		},
		computed: {
			...mapGetters([
				'user'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./baseLess/comments.less');
</style>
