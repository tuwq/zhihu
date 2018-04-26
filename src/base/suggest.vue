<template>
	<div id="suggest">
		<button class="hover-btn" type="button" data-tooltip="建议反馈">
				<svg class="feedback" viewbox="0 0 24 24" width="24" height="24">
					<path d="M19.99 6.99L18 5s-1-1-2-1H8C7 4 6 5 6 5L4 7S3 8 3 9v9s0 2 2.002 2H19c2 0 2-2 2-2V9c0-1-1.01-2.01-1.01-2.01zM16.5 5.5L19 8H5l2.5-2.5h9zm-2 5.5s.5 0 .5.5-.5.5-.5.5h-5s-.5 0-.5-.5.5-.5.5-.5h5z"></path>
				</svg>
		</button>
		<div class="ztag">
			<z-tag class="zTag"><p slot="content">建议反馈</p></z-tag>
		</div>	
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

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('./baseLess/suggest.less');
</style>
