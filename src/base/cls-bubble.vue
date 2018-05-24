<template>
	<div class="cls-bubble">
		<button @click.stop.prevent="closeQuestion">x</button>
		<z-tag class="z-tag"><p slot="content">{{text}}</p></z-tag>
	</div>
</template>

<script type="text/ecmascript-6">
	import zTag from 'base/z-tag.vue';
	export default {
		props: {
			index: {
				type: Number
			},
			questionList: {
				type: Array
			},
			text: {
				type: String,
				default: '不感兴趣'
			}
		},
		components: {
			'z-tag': zTag
		},
		methods: {
			closeQuestion() {
				this.questionList.splice(this.index,1)
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./baseLess/cls-bubble.less');
</style>
