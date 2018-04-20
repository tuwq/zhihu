<template>
 	<div id="Detail">
 		<z-header></z-header>
 		<scroll-header></scroll-header>
 		<div class="main-content">
 			
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import ZHeader from 'z_components/z-header.vue';
	import ScrollHeader from 'detail_components/scroll-header.vue';
	export default {
		components: {
			ZHeader,
			'scroll-header': ScrollHeader
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/Detail.less');
</style>
