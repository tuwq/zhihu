<template>
	<div class="mask" v-show="put_question_mask" @click.stop="cls_mask">
		<div class="mask-inner" @click.stop>
			<div class="mask-left">
				<div class="prompt-1">写下你的问题</div>
				<div class="prompt-2">描述精确的问题更易得到解答</div>
				<form action="">
					<div class="question-main">
						<textarea class="question-title" ref="question_title" placeholder="问题标题" @focus="errStatus=false" v-model="title"></textarea>
						<div style="text-align: center;color: red;">
							<h1 class="errMsg" v-show="errStatus" ref="errMsg"></h1>
						</div>
						<div class="question-topic-box">
							<textarea class="question-topic" ref="question_topic" placeholder="添加话题" v-model="category"></textarea>
							<i class="search-icon"><svg width="24" height="24"><path d="M17.068 15.58a8.377 8.377 0 0 0 1.774-5.159 8.421 8.421 0 1 0-8.42 8.421 8.38 8.38 0 0 0 5.158-1.774l3.879 3.88c.957.573 2.131-.464 1.488-1.49l-3.879-3.878zm-6.647 1.157a6.323 6.323 0 0 1-6.316-6.316 6.323 6.323 0 0 1 6.316-6.316 6.323 6.323 0 0 1 6.316 6.316 6.323 6.323 0 0 1-6.316 6.316z"></path></svg></i>
						</div>
					</div>
					<div class="tool-inner">
						<ul class="tools">
							<span class="desc-font">问题描述  (可选)  :</span>
							<li class="tool-item"><svg width="24" height="24"><path d="M10.546 15c-.466.273-.86.053-.86-.5V9.505c0-.565.385-.778.86-.501l4.278 2.497c.466.272.475.726 0 1.003L10.546 15zM5 5S3 5 3 7v10s0 2 2.002 2H19c2 0 2-2 2-2V7c0-2-2-2-2-2H5z"></path></svg></li>
							<li class="tool-item"><svg width="24" height="24"><path d="M21 17.444C21 18.3 20.1 19 19 19H5c-1.1 0-2-.7-2-1.556V6.556C3 5.7 3.9 5 5 5h14c1.1 0 2 .7 2 1.556v10.888zm-9.437-3.919a.5.5 0 0 1-.862.013l-1.26-2.065a.5.5 0 0 0-.861.012l-2.153 3.767a.5.5 0 0 0 .435.748h10.292a.5.5 0 0 0 .438-.741L14.573 9.78a.5.5 0 0 0-.872-.006l-2.138 3.75z"></path></svg></li>
							<li class="tool-item"><svg width="24" height="24"><path d="M6.295 15.4L5.06 19H3L7.684 6h1.813l4.684 13h-2.06l-1.235-3.6h-4.59zM17.092 19c-1.548 0-2.647-.962-2.647-2.391 0-1.428 1.063-2.27 2.916-2.384l1.782-.103v-.43c0-.653-.419-.996-1.286-.996-.724 0-1.194.25-1.323.663l-.046.147H14.7l.027-.234c.161-1.366 1.436-2.24 3.196-2.24 1.93 0 3.076.987 3.076 2.66v5.188h-1.81v-.75c-.5.56-1.243.87-2.098.87zM6.89 13.646h3.4L8.59 8.69l-1.7 4.956zM17.582 15.7c-.901.06-1.267.325-1.267.842 0 .504.439.827 1.146.827.973 0 1.682-.6 1.682-1.383v-.385l-1.56.1z"></path></svg></li>
						</ul>
					</div>
					<textarea class="question-desc" ref="question_desc" placeholder="问题背景、条件等详细信息" v-model="desc">
						
					</textarea>	
					<div class="question-anonymous">
						<input type="radio" class="anonymous" v-model="anonymousStatus" :value="1"></input>
						<label for="anonymous-font" class="anonymous-font">匿名提问</label>
					</div>
					<div class="question-btn-wrapper">
						<button class="question-btn" @click.stop.prevent="submit">提交问题</button>
					</div>
				</form>
			</div>
			<div class="mask-right">
				<div class="cls">
					<i class="cls-btn" @click.stop.prevent="clsBtn"><svg width="24" height="24"><path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z"></path></svg></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapGetters, mapMutations } from 'vuex';
	import { makeExpandingArea } from 'common/js/common.js';
	import { communicationMixin } from 'common/js/mixin'
	import axios from 'axios'
	import { questionInsertApi } from 'api/question'
	export default {
		mixins: [communicationMixin],
		data(){
			return {
				title: '',
				category: '',
				desc: '',
				anonymousStatus: 0,
				errStatus: false
			}
		},
		methods: {
			submit() {
				if (this.title.length==''||this.category==''||this.category.length>10) {
					$(this.$refs.errMsg).text('标题与话题不能为空且话题不可超过10个字的长度')
					this.errStatus = true
				}else{
					questionInsertApi({
						title: this.title,
						category: this.category,
						desc: this.desc,
						anonymousStatus: this.anonymousStatus
					}, (res)=>{
						communicationMixin.$emit('addQuestion')
						this.setPutQuestionDisPlay(false);
						this.title = ''
						this.category = ''
						this.desc = ''
					})
				}
			},
			cls_mask() {
				this.setPutQuestionDisPlay(false);
			},
			clsBtn() {
				this.setPutQuestionDisPlay(false);
			},
			...mapMutations({
				setPutQuestionDisPlay: 'SET_PUT_QUESTION_MASK'
			}),
		},
		mounted() {
			makeExpandingArea(this.$refs.question_title);
			makeExpandingArea(this.$refs.question_topic);
			makeExpandingArea(this.$refs.question_desc);
		},
		computed: {
			...mapGetters([
				'put_question_mask'
			])
		},
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/putQuestion.less');
</style>
