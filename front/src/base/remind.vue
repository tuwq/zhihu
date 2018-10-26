<template>
	<div id="remind">
		<slot name="toTopBtn"class="toTopBtn"></slot>
		<slot name="suggest" class="suggestBtn"></slot>	
		<div class="ztag">
			<z-tag class="zTag"><p slot="content">{{msg}}</p></z-tag>
		</div>	
	</div>
</template>

<script type="text/ecmascript-6">
	import {toTop} from 'common/js/common.js';
	import zTag from 'base/z-tag.vue';
	export default {
		props: {
			msg:{
				type: String,
				default: ''
			}
		},
		components: {
			'z-tag': zTag
		},
		mounted() {
			toTop($('.toTopBtn'));
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('./baseLess/remind.less');
</style>
