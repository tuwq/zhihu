<template>
 	<div id="d-header-wrapper">
 		<slot name="z-header"></slot>
 		<slot name="detail-header"></slot>
 		<slot name="scroll-header"></slot>
 	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/d-header.less');
</style>
