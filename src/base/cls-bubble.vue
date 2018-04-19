<template>
	<div class="cls-bubble">
		<button>x</button>
		<z-tag class="z-tag"><p slot="content">不感兴趣</p></z-tag>
	</div>
</template>

<script type="text/ecmascript-6">
	import zTag from 'base/z-tag.vue';
	export default {
		components: {
			'z-tag': zTag
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./baseLess/cls-bubble.less');
</style>
