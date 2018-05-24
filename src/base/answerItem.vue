<template>
 	<div id="answerItem">
	
	</div>
</template>

<script type="text/ecmascript-7">
import comments from 'base/comments.vue'
	export default {
		components: {
			comments,
		},
		data(){
			return {
				overflowStatus: false,
				commentsStatus: false,
				dynamicList: []
			}	
		},
		methods: {
			switchCommentsStatus() {
				this.commentsStatus = !this.commentsStatus;
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./baseLess/answerItem.less');
</style>
