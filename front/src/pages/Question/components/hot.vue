<template>
	<div class="hot-wrapper">
		<question-list>
		</question-list>
	</div>
</template>

<script type="text/ecmascript-6">
	import questionList from 'question_components/question-list.vue';
	export default {
		components: {
			'question-list': questionList
		},
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/hot.less');
</style>
