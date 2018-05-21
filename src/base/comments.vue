<template>
 	<div class="comments-container">
 		<div class="comments-inner">
			<loading v-show="loading"></loading>
 			<div class="top-bar">
 				<div class="top-title"><h2 class="title">{{cCount}} 条评论</h2></div>
 				<div class="top-options"><button class="sortBtn"><span>&#8203;<svg viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M13.004 7V4.232c0-.405.35-.733.781-.733.183 0 .36.06.501.17l6.437 5.033c.331.26.376.722.1 1.033a.803.803 0 0 1-.601.264H2.75a.75.75 0 0 1-.75-.75V7.75A.75.75 0 0 1 2.75 7h10.254zm-1.997 9.999v2.768c0 .405-.35.733-.782.733a.814.814 0 0 1-.5-.17l-6.437-5.034a.702.702 0 0 1-.1-1.032.803.803 0 0 1 .6-.264H21.25a.75.75 0 0 1 .75.75v1.499a.75.75 0 0 1-.75.75H11.007z"></path></svg></span>切换为时间排序</button></div>
 			</div>
 			<div>
 				<div class="comment-list" v-if="commentList">

 					<comment v-for="(item,index) in commentList" :count="count" :item="item" :index="index" :key="item._id" :answer_id="answer_id" :question_id="question_id" @replyOver="replyOver" :fromType="fromType"></comment>
 					<!-- <div class="comment-list-divider">
 						<div class="line"></div>
 						<div class="text">以上为精选评论<svg viewBox="0 0 20 20" width="14" height="16"><title></title>
 							<g><path d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zm0-3.68c-.328 0-.61-.116-.846-.345-.236-.23-.354-.515-.354-.856 0-.33.118-.612.354-.848.236-.235.518-.353.846-.353.328 0 .61.114.846.343.236.23.354.515.354.856 0 .34-.118.625-.354.855-.236.23-.518.344-.846.344zm2.76-7.4c-.227.233-.636.622-1.226 1.17-.163.155-.295.29-.393.408-.097.117-.17.224-.218.32-.048.098-.086.195-.112.293-.026.098-.066.268-.12.513-.09.518-.376.777-.856.777-.25 0-.46-.085-.63-.254-.17-.17-.255-.42-.255-.755 0-.418.06-.78.186-1.086.125-.307.29-.576.497-.808.206-.23.485-.506.835-.825.307-.28.53-.49.666-.63.137-.143.252-.3.346-.475.093-.175.14-.364.14-.568 0-.4-.143-.735-.428-1.01-.286-.273-.655-.41-1.106-.41-.528 0-.917.138-1.166.414-.25.278-.46.685-.634 1.223-.163.563-.472.845-.928.845-.27 0-.496-.1-.68-.295-.185-.197-.278-.41-.278-.64 0-.473.147-.952.44-1.438.292-.486.72-.888 1.28-1.207C8.683 4.158 9.34 4 10.087 4c.696 0 1.31.133 1.844.4.532.266.944.63 1.234 1.087.29.46.436.957.436 1.495 0 .423-.083.794-.248 1.113-.166.32-.363.594-.59.826z"></path></g></svg></div>
 					</div> -->
 				</div>
 				<div class="pagination" v-show="pageSum>1" ref="pagin">
 					<button class="pageButton" v-show="page!=1" @click.stop.prevent="getCommentList(page-1)">上一页</button>
					<div style="display: inline-block;">
						<!--少于 4 页 1 2 3 4-->
						<div v-if="pageSum<4" style="display: inline-block;" class="mod">
							<button @click.stop.prevent="getCommentList(item)" class="pageButton" v-for="item in pageSum" type="button" ref="btn">{{item}}</button>
						</div>

						<div v-else style="display: inline-block;" class="mod">
							<!--三种情况 1-->
							<!-- 1 2 3 4 ... 17 -->
							<div v-if="page<=4" class="p1">
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
import comment from 'base/comment.vue'
import loading from 'base/loading.vue'
import axios from 'axios'
	export default {
		props: {
			cCount: {
				type: Number,
				default: 0
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
				count: 0,
				pageSum: '',
				page: 1,
				loading: true
			}
		},
		methods: {
			submit() {
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
						this.$emit('incrCount')
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
						this.incrCount({
							list: this.answers,
							index: this.index
						})
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
						this.count = res.data.result.count
						this.pageSum = Math.ceil(this.count/this.limit)
						this.$nextTick().then(()=> {
							this.currentClass(page)
						})
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
						this.count = res.data.result.count
						this.pageSum = Math.ceil(this.count/this.limit)
						this.$nextTick().then(()=> {
							this.currentClass(page)
						})
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
				this.getCommentList(1)
				if (this.from == 'question') {
					this.$emit('incrCount')
				}else {
					this.incrCount({
						list: this.answers,
						index: this.index
					})
				}
			},
			...mapActions([
		        'incrCount'
		    ]),
		    ...mapMutations({
				setAnswers: 'SET_ANSWERS'
			}),
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
				'user',
				'answers'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./baseLess/comments.less');
</style>
