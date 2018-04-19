<template>
 	<div class="overlay" @click="closeMask">
 		
 	</div>
</template>

<script type="text/ecmascript-6">
	import {mapMutations} from 'vuex';
	export default {
		methods: {
			closeMask() {
				this.setIdeaDisplay(false);
				this.setQuestionDisPlay(false);
				this.setIndexDropDown(false);
			},
			...mapMutations({
				setQuestionDisPlay: 'SET_PUT_QUESTION_MASK',
				setIdeaDisplay: 'SET_WRITE_IDEA_MASK',
				setIndexDropDown: 'SET_INDEX_DROPDOWN'
			})
		},
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/overlay.less');
</style>
