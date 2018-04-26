<template>
	<div id="people">
		<z-header></z-header>
		<div class="main">
			<p-index></p-index>
		</div>
		<suggest></suggest>
	</div>
</template>

<script type="text/ecmascript-6">
	import ZHeader from 'z_components/z-header.vue';
	import Suggest from 'base/suggest.vue';
	import PIndex from 'p_components/p-index.vue';
 	export default {
		components: {
			'z-header': ZHeader,
			'suggest': Suggest,
			'p-index': PIndex
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('./cpLess/people.less');
</style>
