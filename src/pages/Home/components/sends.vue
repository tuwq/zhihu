<template>
	<div class="sends">
		<ul class="send-inner">
			<li class="send-item" @click.stop.prevent="put_question"><i class="icon-question-sign">
				</i><a href="javascript:void(0)">提问</a></li>
			<li class="send-item" @click.stop.prevent="go_questionIndex"><i class="icon-edit"></i><a href="javascript:void(0)">回答</a></li>
			<li class="send-item"><i class="icon-pencil"></i><a href="">写文章</a></li>
			<li class="send-item" @click.stop.prevent="write_idea"><i class="icon-comment"></i><a href="javascript:void(0)">写想法</a></li>
		</ul>
		<span class="caogao">草稿</span>
	</div>
</template>

<script type="text/ecmascript-6">
	import {mapMutations} from 'vuex';
	export default {
		methods: {
			put_question() {
				this.setQuestionDisPlay(true);
			},
			write_idea() {
				this.setIdeaDisplay(true);
			},
			go_questionIndex() {
				
			},
			...mapMutations({
				setQuestionDisPlay: 'SET_PUT_QUESTION_MASK',
				setIdeaDisplay: 'SET_WRITE_IDEA_MASK'	
			})
		},
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/sends.less');
</style>
