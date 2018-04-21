<template>
 	<div id="Detail">
 		<d-header class="d-header">
 			<z-header slot="z-header"></z-header>
	 		<detail-header slot="detail-header"></detail-header>
	 		<scroll-header slot="scroll-header"></scroll-header>
 		</d-header>
 		<div class="main-content">
 			<question-main></question-main>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import ZHeader from 'z_components/z-header.vue';
	import detailHeader from 'detail_components/detail-header.vue';
	import scrollHeader from 'detail_components/scroll-header.vue';
	import dHeader from 'detail_components/d-header.vue';
	import questionMain from 'detail_components/question-main.vue';
	export default {
		components: {
			'z-header': ZHeader,
			'detail-header': detailHeader,
			'scroll-header': scrollHeader,
			'd-header': dHeader,
			'question-main': questionMain
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/Detail.less');
</style>
