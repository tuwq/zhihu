<template>
	<div class="recommend-wrapper">
		<div class="recommend-inner">
			<div class="prompt">
				<h2>添加你擅长的话题，为你推荐可能感兴趣的问题</h2>
			</div>
			<div class="tags">
				<div class="tag">
					<a href="javascript:void(0)" class="tag-name">编程</a>
					<a href="javascript:void(0)" class="tag-cls">x</a>
				</div>
			</div>
			<br><br>
			<div class="search-input-wrapper">
				<input type="text" class="search-input" placeholder="添加擅长话题">
			</div>
			<div class="question-wrapper">
				<div class="question-suggest-title">
					<h4>根据你的擅长话题，推荐以下问题</h4>
					<div class="question-switcher">
						<a href="javascript:void(0)" class="active">热门问题</a>
						<a href="javascript:void(0)">全部问题</a>
					</div>
				</div>
				<question-list></question-list>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import questionList from 'question_base/question-list.vue';
	export default {
		components: {
			'question-list': questionList
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/recommend.less');
</style>
