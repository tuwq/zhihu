<template>
 	<div id="loginHome">
 		<form-compont></form-compont>
 	</div>
</template>

<script type="text/ecmascript-6">
import formCompont from 'login_components/form-compont.vue';
export default {
	methods: {

	},
	components: {
		'form-compont': formCompont
	}
}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/home.less');
</style>
